import CommandModel from "@/api/db/models/CommandModel"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"
import { spawn } from "child_process"

const handler = mw({
  POST: [
    auth,
    async (req, res) => {
      const { ip, scanOptions, options } = req.body
      const user = req.user

      let allOptions = []
      let commandOptions = []

      if (scanOptions) {
        allOptions.push(scanOptions)
        commandOptions.push(scanOptions)
      }

      Object.entries(options).forEach(([optionName, optionValue]) => {
        if (optionValue !== "" && optionValue) {
          const option = `--${optionName.replace(
            /[A-Z]/g,
            (match) => "-" + match.toLowerCase()
          )}`
          allOptions.push(option)
          commandOptions.push(option)
          commandOptions.push(optionValue)
        }
      })

      const resultPromise = new Promise((resolve, reject) => {
        const nmap = spawn("nmap", [commandOptions, ip].flat())
        let result = ""

        nmap.stdout.on("data", (data) => {
          result += data.toString()
        })

        nmap.on("close", (code) => {
          code === 0 ? resolve(result) : reject(`Error ${code}`)
        })
      })

      try {
        const result = await resultPromise

        const command = await CommandModel.create({
          ip,
          options: allOptions,
          result,
          completeCommand: `nmap ${commandOptions.join(" ")} ${ip}`,
          user: { id: user._id, username: user.username },
        })

        res.send({ result: command })

        return
      } catch (err) {
        res.send({ error: err })

        return
      }
    },
  ],
  GET: [
    auth,
    async (req, res) => {
      const user = req.user

      const history = await CommandModel.find({
        "user.id": user._id,
        "user.username": user.username,
      }).sort({ createdAt: -1 })

      res.send({ result: history })
    },
  ],
  DELETE: [
    async (req, res) => {
      console.log("delete")
      const { id } = req.body
      console.log(req.body)
      const command = await CommandModel.deleteOne({ _id: id })
      console.log(command)

      if (command.deletedCount === 0) {
        res.status(404).send({ error: "404 Not found!" })

        return
      }

      res.send({ result: command })
    },
  ],
})

export default handler

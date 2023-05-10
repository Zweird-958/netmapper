import CommandModel from "@/api/db/models/CommandModel"
import auth from "@/api/middlewares/auth"
import isScanning from "@/api/middlewares/isScanning"
import mw from "@/api/mw"
import { spawn } from "child_process"

const handler = mw({
  POST: [
    auth,
    isScanning,
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

      const command = await CommandModel.create({
        ip,
        options: allOptions,
        result: "",
        completeCommand: `nmap ${commandOptions.join(" ")} ${ip}`,
        user: { id: user._id, username: user.username },
      })

      const resultPromise = new Promise((resolve, reject) => {
        const nmap = spawn("nmap", [commandOptions, ip, "--dsds"].flat())
        let result = ""
        let error = ""

        nmap.stdout.on("data", (data) => {
          result += data.toString()
        })

        nmap.stderr.on("data", (data) => {
          error += data.toString()
        })

        nmap.on("close", (code) => {
          code === 0 ? resolve(result) : reject(error)
        })
      })

      try {
        const result = await resultPromise

        await CommandModel.updateOne(
          {
            _id: command._id,
          },
          { result }
        )

        res.send({ result: { ...command, result } })

        return
      } catch (err) {
        await CommandModel.deleteOne({ _id: command._id })

        res.status(400).send({ error: err })

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
        result: { $ne: "" },
      }).sort({ createdAt: -1 })

      res.send({ result: history })
    },
  ],
})

export default handler

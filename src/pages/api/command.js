import CommandModel from "@/api/db/models/CommandModel"
import { spawn } from "child_process"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"

const handler = mw({
  POST: [
    auth,
    async (req, res) => {
      const { ip, scanOptions } = req.body
      const user = req.user

      let options = []

      if (scanOptions) {
        options.push(scanOptions)
      }

      const resultPromise = new Promise((resolve, reject) => {
        const nmap = spawn("nmap", [options, ip].flat())
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
          options,
          result,
          user,
        })
        res.send({ result: command })

        return
      } catch (err) {
        console.error(err)
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
        "user._id": user._id,
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

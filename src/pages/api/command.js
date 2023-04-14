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

        nmap.stdout.on("data", async (data) => {
          result += await data.toString()
        })

        nmap.on("close", (code) => {
          code === 0 ? resolve(result) : reject(`Error ${code}`)
        })
      })

      try {
        // console.log("result")
        const result = await resultPromise
        // console.log(result)

        const command = await CommandModel.create({
          ip,
          options,
          result,
          user,
        })
        res.send({ result: command })

        return
      } catch (err) {
        res.send({ result: err })

        return
      }
    },
  ],
  GET: [
    async (req, res) => {
      const history = await CommandModel.find().sort({ createdAt: -1 })

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

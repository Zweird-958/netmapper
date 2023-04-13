import CommandModel from "@/api/db/models/CommandModel"
import { spawn } from "child_process"
import mw from "@/api/mw"

const handler = mw({
  POST: [
    async (req, res) => {
      const { ip, options } = req.body

      const optionsSelected = Object.entries(options)
        .filter(([, value]) => value === true)
        .map(([key]) => `-${key}`)

      const nmap = spawn("nmap", [optionsSelected, ip].flat())

      const resultPromise = new Promise((resolve, reject) => {
        let result = ""

        nmap.stdout.on("data", async (data) => {
          result += await data.toString()
        })

        nmap.on("close", (code) => {
          code === 0 ? resolve(result) : reject(`Error ${code}`)
        })
      })

      try {
        const result = await resultPromise

        const command = await CommandModel.create({
          ip,
          options: optionsSelected,
          result,
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
      const history = await CommandModel.find()

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

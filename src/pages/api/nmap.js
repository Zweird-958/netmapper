import CommandModel from "@/api/db/models/CommandModel"
import mw from "@/api/mw.js"
import { spawn } from "child_process"

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

        nmap.on("close", () => {
          resolve(result)
        })

        nmap.on("error", (err) => {
          reject(err)
        })
      })

      try {
        const result = await resultPromise

        console.log(optionsSelected)

        const command = await CommandModel.create({
          ip,
          options: optionsSelected,
          result,
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
    async (req, res) => {
      const history = await CommandModel.find()

      res.send({ result: history })
    },
  ],
})

export default handler

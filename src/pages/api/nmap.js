import CommandModel from "@/api/db/models/CommandModel"
import mw from "@/api/mw.js"
import { spawn } from "child_process"

const handler = mw({
  POST: [
    async (req, res) => {
      const { ip } = req.body
      const nmap = spawn("nmap", [ip])

      const resultPromise = new Promise((resolve, reject) => {
        let result = ""

        nmap.stdout.on("data", async (data) => {
          result += await data.toString()
        })

        // nmap.stderr.on("data", (data) => {
        //   console.error(`stderr: ${data}`)
        // })

        nmap.on("close", () => {
          resolve(result)
        })

        nmap.on("error", (err) => {
          reject(err)
        })
      })

      try {
        const result = await resultPromise

        await CommandModel.create({
          ip,
          options: [],
          result,
        })
        res.send({ result: true })

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

import CommandsModel from "@/api/db/models/CommandsModel"
import mw from "@/api/mw.js"
import { exec } from "child_process"

const handler = mw({
  POST: [
    async (req, res) => {
      const { ip } = req.body
      // console.log(ip)
      exec(`nmap -O ${ip}`, async (error, stdout) => {
        if (error) {
          console.error(`Erreur lors de l'exécution de la commande: ${error}`)

          return
        }

        // console.log(`${typeof stdout}`)
        // console.log(`stdout: ${stdout}`)
        // console.log(stdout.length)
        console.log("to create")
        await CommandsModel.create({ ip, options: [], result: stdout })
        console.log("created")
        // console.error(`stderr: ${stderr}`)
      })
      res.send({ result: ip })
    },
    async (req, res) => {
      res.send({ result: true })
    },
  ],
})

export default handler

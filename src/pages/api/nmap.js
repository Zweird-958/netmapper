import mw from "@/api/mw.js"
import { exec } from "child_process"

const handler = mw({
  POST: [
    async (req, res) => {
      console.log("hello")
      const { ip } = req.body
      console.log(ip)
      exec(`nmap ${ip}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur lors de l'exécution de la commande: ${error}`)

          return
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
      })
      res.send({ result: ip })
    },
    async (req, res) => {
      res.send({ result: true })
    },
  ],
})

export default handler

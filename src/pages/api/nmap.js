import mw from "@/api/mw.js"

const handler = mw({
  POST: [
    async (req, res) => {
      const { ip } = req.body
      console.log(ip)
      res.send({ result: ip })
    },
    async (req, res) => {
      res.send({ result: true })
    },
  ],
})

export default handler

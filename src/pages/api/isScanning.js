import auth from "@/api/middlewares/auth"
import isScanning from "@/api/middlewares/isScanning"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    auth,
    isScanning,
    async (req, res) => {
      res.send({ result: true })
    },
  ],
})

export default handler

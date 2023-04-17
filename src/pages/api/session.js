import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

const handler = mw({
  GET: [auth],
})

export default handler

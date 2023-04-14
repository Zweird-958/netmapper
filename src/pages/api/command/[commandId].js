import CommandModel from "@/api/db/models/CommandModel"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    auth,
    async (req, res) => {
      const { commandId } = req.query
      const user = req.user

      const command = await CommandModel.findOne({
        _id: commandId,
        "user._id": user._id,
      })

      if (!command) {
        res.status(404).send({ result: "404 Not found!" })

        return
      }

      res.send({ result: command })
    },
  ],
})

export default handler

import CommandModel from "@/api/db/models/CommandModel"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    auth,
    async (req, res) => {
      const { commandId } = req.query
      const user = req.user

      if (!user) {
        res.status(403).send({ result: "403 Forbidden" })

        return
      }

      try {
        const command = await CommandModel.findOne({
          _id: commandId,
          "user.id": user._id,
          "user.username": user.username,
        })

        if (!command) {
          res.status(404).send({ error: "404 Not found!" })

          return
        }

        res.send({ result: command })
      } catch (err) {
        res.status(404).send({ error: "404 Not Found" })

        return
      }
    },
  ],
})

export default handler

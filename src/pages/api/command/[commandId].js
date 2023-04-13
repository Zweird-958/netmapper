import CommandModel from "@/api/db/models/CommandModel"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    async (req, res) => {
      const { commandId } = req.query
      const command = await CommandModel.findOne({ _id: commandId })

      if (!command) {
        res.status(404).send({ result: "404 Not found!" })

        return
      }

      res.send({ result: command })
    },
  ],
})

export default handler

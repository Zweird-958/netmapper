import CommandModel from "@/api/db/models/CommandModel"
import mw from "@/api/mw"

const handler = mw({
  POST: [
    async (req, res) => {
      const { id } = req.body
      const command = await CommandModel.findOne({ _id: id })

      if (!command) {
        res.status(404).send({ result: "404 Not found!" })

        return
      }

      res.send({ result: command })
    },
  ],
  DELETE: [
    async (req, res) => {
      console.log("delete")
      const { id } = req.body
      console.log(req.body)
      const command = await CommandModel.deleteOne({ _id: id })
      console.log(command)

      if (command.deletedCount === 0) {
        res.status(404).send({ error: "404 Not found!" })

        return
      }

      res.send({ result: command })
    },
  ],
})

export default handler

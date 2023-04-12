import CommandModel from "@/api/db/models/CommandModel"
import mw from "@/api/mw"

const handler = mw({
  POST: [
    async (req, res) => {
      const { id } = req.body
      const command = await CommandModel.findOne({ _id: id })

      if (!command) {
        res.send({ error: "404 Not found!" })

        return
      }

      res.send({ result: command })
    },
  ],
})

export default handler

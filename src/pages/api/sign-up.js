import UserModel from "@/api/db/models/UserModel"
import mw from "@/api/mw"
import hashPassword from "@/api/utils/hashPassword"

const handler = mw({
  POST: [
    async (req, res) => {
      const { email, password, username } = req.body

      try {
        await UserModel.create({
          username,
          email,
          passwordHash: hashPassword(password),
        })

        res.send({ result: true })
      } catch (err) {
        res.send({ error: "Erreur" })
      }
    },
  ],
})

export default handler

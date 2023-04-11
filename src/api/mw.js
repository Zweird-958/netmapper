import config from "@/api/config.js"
import mongoose from "mongoose"

const mw = (handlersByMethod) => async (req, res) => {
  console.log("hello")
  const { method } = req
  const handlers = handlersByMethod[method]

  // Handlers not found
  if (!handlers) {
    res.status(404).send({ error: "not found" })

    return
  }

  // await mongoose.connect(config.db.uri)

  try {
    let handlerIndex = 0

    // Execute each handler
    const next = async () => {
      const handler = handlers[handlerIndex]
      handlerIndex += 1

      await handler(req, res, next)
    }
    await next()
  } finally {
    // await mongoose.disconnect()
  }
}

export default mw

import CommandModel from "@/api/db/models/CommandModel"

const isScanning = async (req, res, next) => {
  const { _id } = req.user

  const commands = await CommandModel.find({ "user.id": _id })

  const commandsInScan = commands.filter((command) => command.result === "")

  if (commandsInScan.length > 0) {
    res.status(403).send({ error: "Forbidden" })

    return
  }

  await next()
}

export default isScanning

import CommandSchema from "@/api/db/schemas/CommandSchema"
import mongoose from "mongoose"

const CommandModel = mongoose.modelNames().includes("Command")
  ? mongoose.model("Command")
  : mongoose.model("Command", CommandSchema)

export default CommandModel

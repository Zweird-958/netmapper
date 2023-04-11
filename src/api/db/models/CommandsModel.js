import CommandsSchema from "@/api/db/schemas/CommandsSchema.js"
import mongoose from "mongoose"

const CommandsModel = mongoose.modelNames().includes("commands")
  ? mongoose.model("commands")
  : mongoose.model("commands", CommandsSchema)

export default CommandsModel

import { Schema } from "mongoose"

const CommandsSchema = new Schema({
  ip: {
    type: String,
    required: true,
  },
  options: {
    type: [],
    required: false,
  },
  result: {
    type: String,
    required: true,
  },
})

export default CommandsSchema

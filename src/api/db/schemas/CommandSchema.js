import { Schema } from "mongoose"

const CommandSchema = new Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    options: [{ type: String }],

    result: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default CommandSchema

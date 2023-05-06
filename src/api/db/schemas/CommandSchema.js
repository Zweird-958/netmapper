import EmbeddedUserSchema from "@/api/db/schemas/EmbeddedUserSchema"
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
    },

    completeCommand: {
      type: String,
      required: true,
    },

    user: {
      type: EmbeddedUserSchema,
      required: true,
    },
  },
  { timestamps: true }
)

export default CommandSchema

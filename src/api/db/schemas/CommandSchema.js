import UserSchema from "@/api/db/schemas/UserSchema"
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

    user: {
      type: UserSchema,
      required: true,
    },
  },
  { timestamps: true }
)

export default CommandSchema

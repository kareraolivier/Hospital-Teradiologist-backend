import * as mongoose from "mongoose";
export const loginAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ipAddress: {
      type: String,
    },
    successful: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("LoginAttempt", loginAttemptSchema);

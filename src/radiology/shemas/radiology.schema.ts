import * as mongoose from "mongoose";
import { Status } from "src/types/enum";

export const RadiologySchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: Status,
      required: false,
      default: Status.Pending,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: [String],
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
    comment: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

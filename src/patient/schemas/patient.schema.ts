import * as mongoose from "mongoose";
import { Status } from "../../auth/enums/enum";

export const PatientSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Radiology",
      required: true,
    },

    status: {
      type: String,
      enum: Status,
      required: false,
      default: Status.Pending,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: false,
    },

    specialistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    specialistName: {
      type: String,
      required: false,
    },

    image: {
      type: String,
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

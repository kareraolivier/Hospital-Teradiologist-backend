import * as mongoose from "mongoose";

export const RadiologySchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
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
  { timestamps: false },
);
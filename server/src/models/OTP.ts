import mongoose, { Schema } from "mongoose";
import { IOTP } from "../types";

const otpSchema: Schema<IOTP> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 2,
    },
  },

  { timestamps: true }
);

const OTP = mongoose.model<IOTP>("OTP", otpSchema);

export default OTP;

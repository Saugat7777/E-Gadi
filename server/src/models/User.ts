import mongoose, { Schema } from "mongoose";
import { IUser } from "../types";

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    contactNumber: {
      type: Number,
    },
    socialMedia: {
      type: [Object],
    },
    role: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;

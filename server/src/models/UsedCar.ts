import mongoose, { Schema } from "mongoose";
import { IUsedCar } from "../types";

const usedCarSchema: Schema<IUsedCar> = new mongoose.Schema(
  {
    carBrand: { type: String, required: true },
    carModel: { type: String, required: true },
    ownership: { type: String, required: true },
    price: { type: Number, required: true },
    kmsDriven: { type: Number, required: true },
    address: { type: String, required: true },
    imageURL: { type: [String], required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
    contactNumber: { type: Number },
    sellerName: { type: String },
    socialMedia: {
      type: [Object],
    },
    condition: { type: String, required: true },
    modification: { type: Boolean, required: true },
    negotiability: { type: Boolean, required: true },
    accidentHistory: { type: Boolean, required: true },

    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUsedCar>("UsedCar", usedCarSchema);

export default User;

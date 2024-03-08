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
    imageURL: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
    contactNumber: { type: Number },
    sellerName: { type: String },
    socialMedia: {
      type: [Object],
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUsedCar>("UsedCar", usedCarSchema);

export default User;

import mongoose, { Schema } from "mongoose";
import { INewCar } from "../types";

const newCarSchema: Schema<INewCar> = new mongoose.Schema(
  {
    carBrand: { type: String, required: true },
    carModel: { type: String, required: true },
    description: { type: String, required: true },
    bodyStyles: { type: String, required: true },
    range: { type: Number, required: true },
    topSpeed: { type: Number, required: true },
    charging_0_to_100: { type: Number, required: true },
    seatingCapacity: { type: Number, required: true },
    price: { type: Number, required: true },
    imageURL: { type: [String], required: true },
    batteryCapacity: { type: Number, required: true },
    madeYear: { type: String, required: true },
    groundClearance: { type: Number, required: true },
    extraFeatures: { type: String, required: true },
    createdBy: { type: String, required: true },
    identity: { type: String, required: true },
    totalRating: { type: Number },
    totalUserRated: { type: [String] },
    rating: { type: Number },
  },
  { timestamps: true }
);

const User = mongoose.model<INewCar>("NewCar", newCarSchema);

export default User;

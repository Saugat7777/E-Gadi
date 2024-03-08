import { Document } from "mongoose";

export interface IUser extends Document {
  full_name: string;
  email: string;
  currentPassword?: string;
  password: string;
  address?: string;
  contactNumber?: number;
  socialMedia?: object[];
  imageURL?: string;
  role: string;
}

export interface INewCar extends Document {
  carBrand: string;
  carModel: string;
  description: string;
  bodyStyles: string;
  range: number;
  topSpeed: number;
  charging_0_to_100: number;
  seatingCapacity: number;
  price: number;
  imageURL: string;
  createdBy: string;
}

export interface IUsedCar extends Document {
  carBrand: string;
  carModel: string;
  ownership: string;
  price: number;
  kmsDriven: number;
  address: string;
  imageURL: string;
  description: string;
  createdBy: string;
  sellerName?: string;
  contactNumber?: number;
  socialMedia?: object[];
}

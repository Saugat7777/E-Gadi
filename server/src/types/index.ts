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
  verified?: boolean;
  passwordVerified?: boolean;
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
  imageURL: string[];
  batteryCapacity: number;
  madeYear: string;
  groundClearance: number;
  extraFeatures: string;
  createdBy: string;
  identity: string;
  totalRating: number;
  totalUserRated: string[];
  rating: number;
}

export interface IUsedCar extends Document {
  carBrand: string;
  carModel: string;
  ownership: string;
  price: number;
  kmsDriven: number;
  address: string;
  imageURL: string[];
  description: string;
  createdBy: string;
  sellerName?: string;
  contactNumber?: number;
  socialMedia?: object[];
  condition: string;
  modification: boolean;
  negotiability: boolean;
  accidentHistory: boolean;
  slug: string;
}

export interface IOTP extends Document {
  email: string;
  otp: string;
  type: "forgotPassword";
  createdAt: any;
}

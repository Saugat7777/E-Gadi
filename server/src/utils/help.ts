import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../models/User";

export const generateJwtToken = (
  jwtData: { id: Types.ObjectId; full_name: string },
  expireTime: string
) => {
  return jwt.sign(jwtData, process.env.JWT_SECRET as string, {
    expiresIn: expireTime,
  });
};

export const actionByUser = async (id: string) => {
  const actionBy = await User.findById(id);
  if (!actionBy) return null;
  return actionBy;
};

export const encryptPassword = async (password: string, saltRounds: number) => {
  return await bcrypt.hash(password, saltRounds);
};

export const decryptPassword = async (
  currentPassword: string,
  dbPassword: string
) => {
  return await bcrypt.compare(currentPassword, dbPassword);
};

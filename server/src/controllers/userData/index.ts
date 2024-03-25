import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { IUser } from "../../types";
import { Generic_Msg } from "../../utils/constant";

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, full_name } = (req as any).user;

    const user: any | null = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", data: {} });
    }
    user.password = undefined;

    return res.status(200).json({ message: Generic_Msg.Get_By_Id, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};
export const getCurrentUserAllData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, full_name } = (req as any).user;

    const user: any | null = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", data: {} });
    }
    // removing password field
    user.password = undefined;

    return res.status(200).json({ message: Generic_Msg.Get_By_Id, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

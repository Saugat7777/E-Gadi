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
    const token = req.header("x-auth-token");
    const userData: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );

    const user: any | null = await User.findById(userData?.id);
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
    const token = req.header("x-auth-token");
    const userData: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );

    const user: any | null = await User.findById(userData?.id);
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

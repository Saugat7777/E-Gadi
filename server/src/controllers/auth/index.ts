import { Request, Response } from "express";
import User from "../../models/User";
import { IUser } from "../../types";
import { Generic_Msg, userMsg } from "../../utils/constant";
import { decryptPassword, generateJwtToken } from "../../utils/help";

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body as Pick<IUser, "email" | "password">;

    // Checking Existing User
    const user: Pick<IUser, "_id" | "full_name" | "password"> | null =
      await User.findOne({ email });
    if (!user) return res.status(404).send({ message: userMsg.notExist });

    // Decrypt password
    const passwordMatched = await decryptPassword(password, user?.password);

    // Checking Valid User
    if (passwordMatched) {
      const token = await generateJwtToken(
        { id: user._id, full_name: user.full_name },
        "2h"
      );

      // user details excluding password
      (user as any).password = undefined;

      return res
        .status(200)
        .json({ accessToken: token, message: "Login sucessfull!", data: user });
    } else {
      return res.status(401).json({ message: userMsg.notValid });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

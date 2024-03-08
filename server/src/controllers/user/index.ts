import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../../models/User";
import { IUser } from "../../types";
import { Generic_Msg, userMsg } from "../../utils/constant";
import {
  decryptPassword,
  encryptPassword,
  generateJwtToken,
} from "../../utils/help";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { full_name, email, password, address, contactNumber, socialMedia } =
      req.body as Pick<
        IUser,
        | "full_name"
        | "email"
        | "password"
        | "contactNumber"
        | "address"
        | "socialMedia"
      >;

    // Checking User
    const user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: userMsg.exist });

    // Hashing User Password
    const saltRounds = 10;
    const hashedPassword = await encryptPassword(password, saltRounds);

    // admin email
    const matchedAdminEmail = process.env.ADMIN_EMAIL?.includes(email);

    // Save User Into Database
    const userData: IUser = new User({
      full_name,
      email,
      password: hashedPassword,
      address,
      contactNumber,
      socialMedia,
      role: matchedAdminEmail ? "admin" : "user",
    });

    const savedUserData = await userData.save();

    // Get userData without password
    const userDataWithoutPassword = {
      ...savedUserData.toObject(),
      password: undefined,
    };

    const token = await generateJwtToken(
      { id: savedUserData._id, full_name: savedUserData.full_name },
      "5m"
    );

    return res.status(200).json({
      accessToken: token,
      message: "Sucessfully, user registered",
      data: userDataWithoutPassword,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const { body } = req;

    const {
      full_name,
      email,
      password,
      currentPassword,
      address,
      contactNumber,
      role,
      socialMedia,
      imageURL,
    } = body as Pick<
      IUser,
      | "full_name"
      | "email"
      | "password"
      | "currentPassword"
      | "contactNumber"
      | "address"
      | "role"
      | "socialMedia"
      | "imageURL"
    >;

    if (currentPassword) {
      // Checking Existing User
      const user: Pick<IUser, "_id" | "full_name" | "password"> | null =
        await User.findOne({ email });
      if (!user) return res.status(404).send({ message: userMsg.notExist });

      // Decrypt password
      const passwordMatched = await decryptPassword(
        currentPassword,
        user?.password
      );

      if (passwordMatched) {
        // Hashing User Password
        const saltRounds = 10;
        const hashedPassword = await encryptPassword(password, saltRounds);
        const updatedUser: any = await User.findByIdAndUpdate(
          { _id: id },
          {
            full_name,
            email,
            password: hashedPassword,
            address,
            contactNumber,
            role,
            socialMedia,
            imageURL,
          }
        ).select("-password");

        if (!updatedUser)
          return res.status(400).json({ message: "User not found", data: {} });

        // Get userData without password
        const userDataWithoutPassword = {
          updatedUser,
          password: undefined,
        };

        return res.status(200).json({
          message: "Sucessfully, user updated",
          data: userDataWithoutPassword,
        });
      } else {
        return res.status(401).json({ message: userMsg.notValid });
      }
    } else {
      const updatedUser: any = await User.findByIdAndUpdate(
        { _id: id },
        {
          full_name,
          email,
          address,
          contactNumber,
          role,
          socialMedia,
          imageURL,
        }
      ).select("-password");

      if (!updatedUser)
        return res.status(400).json({ message: "User not found", data: {} });

      // Get userData without password
      const userDataWithoutPassword = {
        updatedUser,
        password: undefined,
      };

      return res.status(200).json({
        message: "Sucessfully, user updated",
        data: userDataWithoutPassword,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: Generic_Msg.Server_Error, error });
  }
};

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users: IUser[] = await User.find().select("-password");

    return res.status(200).json({ message: Generic_Msg.Get_All, data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

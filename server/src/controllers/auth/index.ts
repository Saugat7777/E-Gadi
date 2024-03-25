import { Request, Response } from "express";
import { LoginTicket, OAuth2Client } from "google-auth-library";
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

export const loginWithGoogle = async (req: Request, res: Response) => {
  try {
    const client = new OAuth2Client();
    const {
      body: { accessToken },
    } = req;

    if (!accessToken)
      return res.status(401).json({ message: "Something went wrong..." });

    (async () => {
      await client
        .verifyIdToken({
          idToken: accessToken,
          audience:
            "886062611278-j96irk5c6udfurhdf656svr969me1l3d.apps.googleusercontent.com",
        })
        .then(async (resp: any) => {
          const { email, name, picture }: any = resp.getPayload();

          // Checking Existing User
          const userData: Pick<IUser, "_id" | "full_name" | "verified"> | null =
            await User.findOne({ email });

          if (!userData) {
            const newUser: IUser = new User({
              full_name: name,
              email,
              role: "user",
              verified: false,
              imageURL: picture,
              passwordVerified: false,
            });
            const savedUserData = await newUser.save();
            return res.status(200).json({
              accessToken,
              message: "Sucessfully, user registered",
              data: savedUserData,
            });
          } else {
            (userData as any).password = undefined;
            return res.status(200).json({
              accessToken,
              message: "Login sucessfull!",
              data: {
                full_name: name,
                email,
                role: "user",
                verified: userData?.verified ?? false,
                imageURL: picture,
              },
            });
          }
        })
        .catch((err) =>
          res.status(401).json({ message: "Invalid google token", err })
        );
    })();
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IUser } from "../types";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const client = new OAuth2Client();

  const token = req.header("x-auth-token");
  const gToken = req.header("google-auth-token");

  if (!token && !gToken)
    return res.status(401).json({ message: "Access Denied (token required)" });

  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).user = user;

      next();
    } catch (error) {
      res.status(401).json({ message: "Token expired" });
    }
  }

  if (gToken) {
    try {
      (async () => {
        // google auth token verifying
        await client
          .verifyIdToken({
            idToken: gToken as string,
            audience:
              "886062611278-j96irk5c6udfurhdf656svr969me1l3d.apps.googleusercontent.com",
          })
          .then(async (resp: any) => {
            const { email, picture, name } = resp.getPayload();

            // getting user
            const existingUser: Pick<IUser, "_id" | "full_name"> | null =
              await User.findOne({ email });

            if (!existingUser)
              return res
                .status(401)
                .json({ message: "User not found via google login" });

            const userData = {
              id: existingUser?._id,
              full_name: existingUser?.full_name,
            };

            (req as any).user = userData;
            next();
          })
          .catch((err) =>
            res.status(401).json({ message: "Google Auth Failed" })
          );
      })();
    } catch (error) {
      return res.status(401).json({ message: "Google Auth Failed!" });
    }
  }
};

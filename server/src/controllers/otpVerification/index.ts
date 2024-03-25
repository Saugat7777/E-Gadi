import { Request, Response } from "express";
import nodemailer from "nodemailer";
import otpGeneratorLib from "otp-generator";
import OTP from "../../models/OTP";
import User from "../../models/User";
import { Generic_Msg, userMsg } from "../../utils/constant";
import { encryptPassword } from "../../utils/help";
import mailSender from "../../utils/nodemailer";

export const generateOtp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: userMsg.notExist });
    const data = new OTP({
      email: user.email,
      otp: otpGeneratorLib.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
      }),
      type: "forgotPassword",
    });
    const addedOtp = await data.save();
    const to = email;
    const subject = "E-Gadi -- Reset Your Password";
    const from = "egadi@gmail.com";
    const html = `<div><h2>Password Reset</h2>
    <p>You've requested a password reset for your account. Enter the digits below to reset your password:</p> <p><a href="" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">${addedOtp?.otp}</a></p><p>Note: The otp is only valid for 2 minutes.</p><p>If you didn't request a password reset, you can safely ignore this email.</p><p>Thank you,<br>E-Gadi Team</p></div>`;

    const mailData = await mailSender(to, subject, from, html);

    return res.status(200).json({
      message: "OTP fetched successfully",
      mailData,
      data: { email: user?.email, otp: addedOtp?.otp, type: addedOtp?.type },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const verfiyOtp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, receivedOTP, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).send({ message: userMsg.notExist, data: {} });

    const otpDetails = await OTP.findOne({ email });
    if (!otpDetails)
      return res
        .status(404)
        .send({ message: "Please, generate OTP !", data: {} });

    const otpMatch = receivedOTP === otpDetails?.otp;

    if (otpMatch) {
      const saltRounds = 10;
      const hashedPassword = await encryptPassword(password, saltRounds);
      const updatedUser: any = await User.findByIdAndUpdate(
        { _id: user?._id },
        {
          password: hashedPassword,
        }
      ).select("-password");
      if (!updatedUser)
        return res.status(400).json({ message: "User not found", data: {} });
      return res
        .status(200)
        .json({ message: "Password Reset Sucessfully", data: {} });
    }

    return res.status(400).json({ message: "Invalid OTP number !", data: {} });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

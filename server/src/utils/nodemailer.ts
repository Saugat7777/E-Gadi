import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const mailSender = async (to: any, subject: any, from: any, html: any) => {
  try {
    const info = transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error(error);
  }
};

export default mailSender;

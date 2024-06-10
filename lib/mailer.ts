import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { updateForgetPasswordToken } from "./actions/user.action";

export const sendEmail = async ({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) => {
  try {
    const token = await bcryptjs.hash(userId.toString(), 10);
    const currentDate = new Date();
    const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

    await updateForgetPasswordToken(userId, token, nextDay);

    const url = `${process.env.NEXTAUTH_URL}/resetpassword?token=${token}`;

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.GOOGLE_APP_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const emailOptions = {
      from: process.env.GOOGLE_APP_USER,
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${url}">here</a> to "reset your password"
          or copy and paste the link below in your browser. <br> ${url}</p>`,
    };

    const response = await transport.sendMail(emailOptions);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

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

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
      },
    });

    const url = `${process.env.NEXTAUTH_URL}/resetpassword?token=${token}`;

    const emailOptions = {
      from: "kamalpreetsingh025@gmail.com",
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

import { getUserByEmail } from "@/lib/actions/user.action";
import { sendEmail } from "@/lib/mailer";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { email } = requestBody;

    const user: any = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    //send password reset email
    await sendEmail({
      email,
      userId: user.id,
    });

    return NextResponse.json({
      message: "Password reset email sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.msg }, { status: 500 });
  }
};

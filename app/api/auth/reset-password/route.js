import { sendResetPasswordEmail } from "@/lib/action";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const result = await sendResetPasswordEmail(undefined, formData);

    if (result?.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: result.success });
  } catch (error) {
    console.error("Error sending reset password email:", error);
    return NextResponse.json({ error: "Failed to send reset password email" }, { status: 500 });
  }
}

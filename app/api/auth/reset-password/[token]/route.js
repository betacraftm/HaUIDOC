import { resetPassword } from "@/lib/action";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const formData = await request.formData();
    formData.append("token", params.token);

    const result = await resetPassword(undefined, formData);

    if (result?.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: result.success });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}

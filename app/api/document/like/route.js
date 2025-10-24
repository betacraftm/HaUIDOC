import { NextResponse } from "next/server";
import { likeDocument } from "@/lib/action";

export async function POST(req) {
  try {
    const { userId, docId } = await req.json();
    const result = await likeDocument(userId, docId);
    return NextResponse.json(result || { success: true });
  } catch (error) {
    console.error("API /like error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

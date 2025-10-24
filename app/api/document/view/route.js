import { NextResponse } from "next/server";
import { viewedDocument } from "@/lib/action";

export async function POST(req) {
  try {
    const { userId, docId } = await req.json();
    const result = await viewedDocument(userId, docId);
    return NextResponse.json(result || { success: true });
  } catch (error) {
    console.error("API /view error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

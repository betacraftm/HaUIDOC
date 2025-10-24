import { NextResponse } from "next/server";
import { getLikedState } from "@/lib/action";

export async function POST(req) {
  try {
    const { userId, docId } = await req.json();
    const liked = await getLikedState(userId, docId);
    return NextResponse.json({ liked });
  } catch (error) {
    console.error("API /liked-state error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

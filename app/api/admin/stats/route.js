import { getAdminStats } from "@/lib/action";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getAdminStats();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 });
  }
}

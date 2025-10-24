import { deleteDocument } from "@/lib/action";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const result = await deleteDocument(params.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
  }
}

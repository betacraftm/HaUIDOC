import { NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
import { includes } from "zod";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { docId, userId, comment } = await request.json();

    if (!docId || !userId || !comment) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const newComment = await prisma.comments.create({
      data: { user_id: userId, document_id: docId, content: comment },
      include: { users: { select: { name: true, image_url: true } } },
      omit: { document_id: true, user_id: true },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error post comment" },
      { status: 500 },
    );
  }
}

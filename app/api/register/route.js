import { PrismaClient } from "../../../generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { name, username, password, major_id } = await request.json();

    if (!name || !username || !password || !major_id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Check if username already exists
    const existingUser = await prisma.users.findUnique({
      where: { username },
    });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Username already exists" }),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Change major_id type to integer
    const majorIdInt = parseInt(major_id);

    // Create user
    const user = await prisma.users.create({
      data: {
        name,
        username,
        password_hash: hashedPassword,
        major_id: majorIdInt,
      },
    });

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          major_id: user.major_id,
        },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

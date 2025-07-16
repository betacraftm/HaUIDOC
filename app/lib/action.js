"use server";

import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

const registerSchema = z.object({
  name: z.string().min(8, "Họ và tên phải có ít nhất 8 ký tự"),
  username: z.string().min(8, "Tên đăng nhập phải có ít nhất 8 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export async function registerUser(formData) {
  // Convert FormData to object

  const data = Object.fromEntries(formData);

  // Validate input
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map((issue) => issue.message);
    return { error: errorMessages.join(", ") };
  }
  const { name, username, password, major_id } = parsed.data;

  // Check if username exists
  const existingUser = await prisma.users.findUnique({
    where: { username },
  });
  if (existingUser) {
    return { error: "Tên đăng nhập đã tồn tại" };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Change major_id type to integer
  const majorIdInt = parseInt(major_id, 10);

  // Create user
  await prisma.users.create({
    data: {
      name,
      username,
      password_hash: hashedPassword,
      major_id: majorIdInt,
    },
  });
}

"use server";

import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs";
import { registerSchema } from "./definition";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function registerUser(prevState, formData) {
  const data = Object.fromEntries(formData.entries());

  const parsed = registerSchema.safeParse({
    name: data.name,
    username: data.username,
    password: data.password,
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  const { name, username, password } = parsed.data;
  const major_name = data.major_name;

  const existingUser = await prisma.users.findUnique({
    where: { username },
  });
  if (existingUser) {
    return { error: { message: "Tên đăng nhập đã tồn tại" } };
  }

  const major_id = (
    await prisma.majors.findFirst({ where: { name: major_name } })
  )?.id;

  if (!major_id) {
    return { error: { message: "Ngành học không hợp lệ" } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const majorIdInt = parseInt(major_id);
  await prisma.users.create({
    data: {
      id: uuidv4(),
      name,
      username,
      password_hash: hashedPassword,
      major_id: majorIdInt,
    },
  });
  redirect("/login");
}

export async function loginUser(prevState, formData) {
  const data = Object.fromEntries(formData.entries());

  const { username, password } = data;

  if (!username || !password) {
    return { error: { message: "Tên đăng nhập và mật khẩu là bắt buộc" } };
  }

  const user = await prisma.users.findUnique({
    where: { username },
  });
  if (!user) {
    return { error: { message: "Tên đăng nhập hoặc mật khẩu không đúng" } };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return { error: { message: "Tên đăng nhập hoặc mật khẩu không đúng" } };
  }

  // Redirect to the home page or dashboard after successful login
  redirect("/dashboard");
}

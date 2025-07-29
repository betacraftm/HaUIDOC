"use server";

import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema, uploadSchema } from "./definition";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";

const prisma = new PrismaClient();

export async function registerUser(prevState, formData) {
  try {
    const name = formData.get("name");
    const username = formData.get("username");
    const password = formData.get("password");
    const major_name = formData.get("major_name");

    const parsed = registerSchema.safeParse({
      name: name,
      username: username,
      password: password,
    });
    if (!parsed.success) {
      return { error: parsed.error.flatten().fieldErrors };
    }

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
    await prisma.users.create({
      data: {
        name,
        username,
        password_hash: hashedPassword,
        major_id,
      },
    });
  } catch (error) {
    console.log("Error registering user:", error);
    return { error: { message: "Đã xảy ra lỗi khi đăng ký" } };
  }

  redirect("/login");
}

export async function loginUser(prevState, formData) {
  try {
    const username = formData.get("username");
    const password = formData.get("password");

    const parsed = loginSchema.safeParse({
      username: username,
      password: password,
    });
    if (!parsed.success) {
      return { error: parsed.error.flatten().fieldErrors };
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

    await createSession(user.id);
  } catch (error) {
    console.error("Error logging in user:", error);
    return { error: { message: "Đã xảy ra lỗi khi đăng nhập" } };
  }

  redirect("/dashboard");
}

export async function logoutUser() {
  try {
    await deleteSession();
  } catch (error) {
    console.error("Error logging out user:", error);
  }

  redirect("/");
}

export async function uploadDocument(prevState, formData) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const documentFile = formData.get("documentFile");

    const parsed = uploadSchema.safeParse({
      title: title,
      description: description,
    });
    if (!parsed.success) {
      return { error: parsed.error.flatten().fieldErrors };
    }
    // Validate file type and size here if needed

    // Save the file to your storage (e.g., local filesystem, cloud storage)
    // For example, using a library like multer for Node.js

    // Save document metadata to the database
    await prisma.documents.create({
      data: {
        title,
        description,
        file_path: documentFile.name, // Adjust based on your storage solution
      },
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    return { error: { message: "Đã xảy ra lỗi khi tải lên tài liệu" } };
  }

  redirect("/documents");
}

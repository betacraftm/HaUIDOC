"use server";

import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema, uploadSchema } from "./definition";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";
import { acceptedFileTypes } from "@/utils/filetype";
import { storage } from "./firebase/config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { getUserAuth } from "./auth";

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

    //get subjectid field

    const parsed = uploadSchema.safeParse({
      title: title,
      description: description,
    });
    if (!parsed.success) {
      return { error: parsed.error.flatten().fieldErrors };
    }

    // Validate file type and size here if needed
    if (!documentFile) {
      return { error: { message: "Hãy chọn tài liệu để tải lên" } };
    }

    if (!acceptedFileTypes.includes(documentFile.type)) {
      return {
        error: { message: "Chỉ chấp nhận các tệp PDF, DOC, hoặc DOCX." },
      };
    }

    // Kiểm tra kích thước tệp (ví dụ: tối đa 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (documentFile.size > MAX_FILE_SIZE) {
      return {
        error: { message: "Kích thước tệp không được vượt quá 5MB." },
      };
    }

    const storageRef = ref(storage, `documents/${documentFile.name}`);

    const snapshot = await uploadBytes(storageRef, documentFile);

    const { user } = await getUserAuth();

    const dowloadURL = await getDownloadURL(snapshot.ref);

    await prisma.documents.create({
      data: {
        title,
        desc: description,
        file_url: dowloadURL,
        uploaded_by: user.id,
        //still missing the subject_id
      },
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    return { error: { message: "Đã xảy ra lỗi khi tải lên tài liệu" } };
  }

  redirect("/dashboard");
}

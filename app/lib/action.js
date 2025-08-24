"use server";

import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema, uploadSchema } from "./definition";
import { createSession, deleteSession } from "./session";
import { storage } from "./firebase/config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { getUserAuth } from "./auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const registerUser = async (prevState, formData) => {
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

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return { error: { message: "Tên đăng nhập đã tồn tại" } };
    }

    const majorId = (
      await prisma.major.findFirst({ where: { name: major_name } })
    )?.id;

    if (!majorId) {
      return { error: { message: "Ngành học không hợp lệ" } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        username,
        password_hash: hashedPassword,
        major_id: majorId,
      },
    });
  } catch (error) {
    console.log("Error registering user:", error);
    return { error: { message: "Đã xảy ra lỗi khi đăng ký" } };
  }

  redirect("/login");
};

export const loginUser = async (prevState, formData) => {
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

    const user = await prisma.user.findUnique({
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
};

export const logoutUser = async () => {
  try {
    await deleteSession();
  } catch (error) {
    console.error("Error logging out user:", error);
  }

  redirect("/");
};

export const uploadDocument = async (prevState, formData) => {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const documentFile = formData.get("documentFile");
    const subjectName = formData.get("subjectName");

    // add subjectSchema later
    const parsed = uploadSchema.safeParse({
      title: title,
      description: description,
      subject: subjectName,
    });
    if (!parsed.success) {
      return { error: parsed.error.flatten().fieldErrors };
    }

    let subjectId = (
      await prisma.subject.findFirst({
        where: { name: subjectName },
      })
    )?.id;

    if (!subjectId) {
      subjectId = await prisma.subject
        .create({
          data: {
            name: subjectName,
          },
        })
        .then((subject) => subject.id);
    }

    const storageRef = ref(storage, `documents/${documentFile.name}`);

    const snapshot = await uploadBytes(storageRef, documentFile);

    const { user } = await getUserAuth();

    const dowloadURL = await getDownloadURL(snapshot.ref);

    await prisma.document.create({
      data: {
        title,
        desc: description,
        file_url: dowloadURL,
        uploaded_by: user.id,
        subject_id: subjectId,
      },
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    return { error: { message: "Đã xảy ra lỗi khi tải lên tài liệu" } };
  }

  revalidatePath("/dashboard");
};

export const viewedDocument = async (userId, docId) => {
  try {
    const now = new Date();
    await prisma.userViewedDocument.upsert({
      where: {
        user_id_document_id: {
          user_id: userId,
          document_id: docId,
        },
      },
      update: {
        viewed_at: now,
      },
      create: {
        user_id: userId,
        document_id: docId,
      },
    });
  } catch (error) {
    console.error("Error viewed document:", error);
    return {
      error: {
        message: "Đã xảy ra lỗi khi cập nhật trạng thái xem tài liệu.",
      },
    };
  }
  revalidatePath("/dashboard");
};

export const likeDocument = async (userId, docId) => {
  try {
    // Check if like or not
    const likeRecord = await prisma.userLikedDocument.findUnique({
      where: {
        user_id_document_id: {
          user_id: userId,
          document_id: docId,
        },
      },
    });

    // If liked already, delete the record
    if (likeRecord) {
      await prisma.userLikedDocument.delete({
        where: {
          user_id_document_id: {
            user_id: userId,
            document_id: docId,
          },
        },
      });
    } else {
      // else create new record
      await prisma.userLikedDocument.create({
        data: { user_id: userId, document_id: docId },
      });
    }
  } catch (error) {
    console.error("Error liked document:", error);
    return {
      error: {
        message: "Đã xảy ra lỗi khi cập nhật trạng thái thích tài liệu.",
      },
    };
  }
};

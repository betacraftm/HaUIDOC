"use server";

import bcrypt from "bcryptjs";
import { registerSchema, uploadSchema, resetPasswordSchema } from "./definition";
import { storage } from "./firebase/config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { getSession } from "./getSession";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuth, signInAnonymously } from "firebase/auth";
import { promisify } from "util";
import libre from "libreoffice-convert";
import { PrismaClient } from "generated/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();
const convertAsync = promisify(libre.convert);

export const registerUser = async (prevState, formData) => {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const major_name = formData.get("major_name");

    const parsed = registerSchema.safeParse({
      name: name,
      email: email,
      username: username,
      password: password,
    });
    if (!parsed.success) {
      return { error: parsed.error.flatten().fieldErrors };
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return { error: { message: "Tên đăng nhập hoặc email đã được sử dụng" } };
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
        email,
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

export const sendResetPasswordEmail = async (prevState, formData) => {
  const email = formData.get("email");

  // check user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Email không tồn tại" };
  }

  // generate token
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 phút

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expires,
    },
  });

  // send email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Khôi phục mật khẩu",
    html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 30px; text-align: center;">
    <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 30px;">
      <h2 style="color: #2d3748;">Khôi phục mật khẩu</h2>
      <p style="font-size: 16px; color: #4a5568; margin-bottom: 24px;">
        Xin chào,<br>
        Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn trên <strong>HaUIDOC</strong>.
      </p>
      <a href="${resetUrl}"
        style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        Đặt lại mật khẩu
      </a>
      <p style="font-size: 14px; color: #718096; margin-top: 24px;">
        Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.<br>
        Liên kết có hiệu lực trong vòng <strong>15 phút</strong>.
      </p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
      <p style="font-size: 12px; color: #a0aec0;">
        © 2025 HaUIDOC. Mọi quyền được bảo lưu.<br>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #2563eb; text-decoration: none;">Truy cập HaUIDOC</a>
      </p>
    </div>
  </div>
  `,
  });

  return { success: "Email khôi phục đã được gửi!" };
};

export async function resetPassword(prevState, formData) {
const token = formData.get("token");
const newPassword = formData.get("password");

const parsed = resetPasswordSchema.safeParse({
password: newPassword,
});
if (!parsed.success) {
return { error: parsed.error.flatten().fieldErrors };
}

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });
  if (!resetToken || resetToken.expires < new Date()) {
    return { error: "Token không hợp lệ hoặc đã hết hạn" };
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { password_hash: hashed },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return { success: "Mật khẩu đã được đổi thành công!" };
}

export const uploadDocument = async (prevState, formData) => {
  let newDocument = null;

  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const documentFile = formData.get("documentFile");
    const subjectName = formData.get("subjectName");

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

    const auth = getAuth();
    await signInAnonymously(auth);

    let fileToUpload = documentFile;
    let fileName = documentFile.name;

    if (
      documentFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      documentFile.type === "application/msword"
    ) {
      const buffer = Buffer.from(await documentFile.arrayBuffer());

      // Convert DOC/DOCX → PDF
      const pdfBuffer = await convertAsync(buffer, ".pdf", undefined);

      // Replace file with PDF
      fileName = fileName.replace(/\.(docx|doc)$/i, ".pdf");
      fileToUpload = new File([pdfBuffer], fileName, {
        type: "application/pdf",
      });
    }

    const storageRef = ref(storage, `documents/${fileName}`);

    const snapshot = await uploadBytes(storageRef, fileToUpload);

    const { user } = await getSession();

    const dowloadURL = await getDownloadURL(snapshot.ref);

    newDocument = await prisma.document.create({
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
  revalidatePath("/home");
  redirect(`/upload/complete/${newDocument.id}`);
};

export const viewedDocument = async (userId, docId) => {
  try {
    const now = new Date();

    // Track user view history
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

    // Increment document view count
    await prisma.document.update({
      where: { id: docId },
      data: {
        view_count: {
          increment: 1,
        },
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
  revalidatePath("/home");
};

export const downloadDocument = async (userId, docId) => {
  try {
    // Increment document download count
    await prisma.document.update({
      where: { id: docId },
      data: {
        download_count: {
          increment: 1,
        },
      },
    });

    // Optionally track user download history if needed
    // You could add a UserDownloadedDocument table similar to UserViewedDocument

    return { success: true };
  } catch (error) {
    console.error("Error downloading document:", error);
    return {
      error: {
        message: "Đã xảy ra lỗi khi tải tài liệu.",
      },
    };
  }
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

  revalidatePath("/home");
};

export const getLikedState = async (userId, docId) => {
  try {
    const likeRecord = await prisma.userLikedDocument.findUnique({
      where: {
        user_id_document_id: {
          user_id: userId,
          document_id: docId,
        },
      },
    });

    if (likeRecord) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error get liked state:", error);
    return {
      error: {
        message: "Đã xảy ra lỗi khi lấy trạng thái thích tài liệu.",
      },
    };
  }
};

export const updateUserProfile = async (prevState, formData) => {
  try {
    const { user } = await getSession();
    if (!user?.id) {
      return { error: "Chưa đăng nhập." };
    }

    const userId = user.id;
    const majorId = formData.get("majorId");

    if (!majorId) {
      return { error: "Không có thay đổi nào được gửi." };
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        ...(majorId ? { major_id: majorId } : {}),
      },
    });

    revalidatePath("/profile");
  } catch (error) {
    console.error("Update profile error:", error);
    return { error: "Đã xảy ra lỗi khi cập nhật hồ sơ." };
  }
};

// Admin Actions
export const getAdminStats = async () => {
  try {
    // Get total counts
    const totalDocuments = await prisma.document.count();
    const totalUsers = await prisma.user.count({ where: { role: "client" } }); // Only count regular users
    const totalAdmins = await prisma.user.count({ where: { role: "admin" } });

    // Calculate total downloads (assuming download_count field exists)
    // If it doesn't exist, we can track downloads differently
    const totalDownloads = await prisma.document.aggregate({
      _sum: {
        download_count: true,
      },
    });

    // Calculate total views (assuming view_count field exists)
    const totalViews = await prisma.document.aggregate({
      _sum: {
        view_count: true,
      },
    });

    // Get users list
    const users = await prisma.user.findMany({
      include: {
        majors: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      // Add is_banned field if it exists, otherwise remove this filter
      where: { role: "client" }, // Only show regular users in admin panel
    });

    // Get documents list
    const documents = await prisma.document.findMany({
      include: {
        users: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return {
      stats: {
        totalDocuments,
        totalUsers,
        totalAdmins,
        totalDownloads: totalDownloads._sum.download_count || 0,
        totalViews: totalViews._sum.view_count || 0,
      },
      users: users.map((user) => ({
        ...user,
        major: user.majors, // Rename to match frontend expectation
        is_banned: false, // Always false since we removed banned functionality
      })),
      documents,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw new Error("Failed to fetch admin statistics");
  }
};

export const deleteDocument = async (documentId) => {
  try {
    // Check if user is admin (implement proper authentication later)
    const session = await getSession();
    if (session?.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    // First, delete related records to maintain referential integrity
    await prisma.comment.deleteMany({
      where: { document_id: documentId },
    });

    await prisma.userLikedDocument.deleteMany({
      where: { document_id: documentId },
    });

    await prisma.userViewedDocument.deleteMany({
      where: { document_id: documentId },
    });

    // Then delete the document
    await prisma.document.delete({
      where: { id: documentId },
    });

    // Revalidate admin page
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
};

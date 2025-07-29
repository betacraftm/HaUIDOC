import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .regex(
      /^[\p{L} ]{8,}$/u,
      "Họ và tên phải có ít nhất 8 ký tự và chỉ chứa chữ cái, khoảng trắng",
    ),

  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_]{8,}$/,
      "Tên đăng nhập phải có ít nhất 8 ký tự, chỉ được chứa chữ cái, số và gạch dưới",
    ),

  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
      "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
    ),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

export const uploadSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  description: z.string().optional(),
});

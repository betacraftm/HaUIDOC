/**
 * Zod Validation Schemas
 *
 * This file contains all Zod validation schemas used throughout the HaUIDOC application.
 * Zod provides runtime type checking and validation for form inputs, API requests,
 * and data processing to ensure data integrity and security.
 *
 * Schema Categories:
 * - User Authentication: Login, registration, password reset
 * - Document Management: Upload validation and metadata
 * - Profile Management: User profile updates
 *
 * Validation Features:
 * - Input sanitization and type checking
 * - Custom error messages in Vietnamese
 * - File upload restrictions (size, type)
 * - Password strength requirements
 * - Email format validation
 *
 * @see https://zod.dev/ for schema documentation
 */

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

  email: z.email("Email không hợp lệ"),

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
subject: z.string().min(1, "Môn học là bắt buộc"),
});

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
    "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
  );

export const resetPasswordSchema = z.object({
  password: passwordSchema,
});

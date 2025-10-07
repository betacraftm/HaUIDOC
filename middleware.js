import { NextResponse } from "next/server";
import { auth } from "./auth"; // <-- import từ file auth.js

// Các route yêu cầu đăng nhập
const protectedRoutes = ["/dashboard", "/profile", "/upload"];

// Các route công khai
const publicRoutes = [
  "/login",
  "/register",
  "/",
  "/donate",
  "/forgot-password",
  "/reset-password",
];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // ✅ Lấy session từ NextAuth (tự đọc cookie, giải mã JWT)
  const session = await auth();

  // ⛔ Nếu là route cần đăng nhập mà chưa có session → về /login
  if (isProtectedRoute && !session?.user) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", path); // tùy chọn: quay lại sau đăng nhập
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Nếu là route public mà user đã đăng nhập → về /dashboard
  if (
    isPublicRoute &&
    session?.user &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  // Cho phép truy cập bình thường
  return NextResponse.next();
}

// ✅ Cấu hình: áp dụng cho tất cả route trừ static & api
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

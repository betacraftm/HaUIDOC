/**
 * Next.js Middleware Configuration
 *
 * This middleware handles route protection, authentication redirects, and access control
 * for the HaUIDOC application. It runs on every request and controls navigation flow
 * based on user authentication status and roles.
 *
 * Route Categories:
 * - Protected Routes: Require authentication (/home, /profile, /upload, /documents)
 * - Admin Routes: Require admin role (/admin)
 * - Public Routes: Accessible without authentication
 *
 * Flow Logic:
 * - Authenticated users accessing "/" are redirected to "/home" (entry point)
 * - Unauthenticated users are redirected to login for protected routes
 * - Admin routes require both authentication and admin role
 *
 * @see https://nextjs.org/docs/advanced-features/middleware
 */

import { NextResponse } from "next/server";
import { auth } from "./auth";

// Routes that require authentication
const protectedRoutes = ["/home", "/profile", "/upload", "/documents"];

// Routes that require admin privileges
const adminRoutes = ["/admin"];

// Routes accessible without authentication
const publicRoutes = [
  "/login",
  "/register",
  "/",
  "/forgot-password",
  "/reset-password",
];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await auth();

  // Check admin routes first
  if (isAdminRoute) {
    if (!session?.user) {
      // Not authenticated, redirect to login
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }

    if (session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/home", req.nextUrl.origin));
    }
  }

  if (isProtectedRoute && !session?.user) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from root "/" to "/home" (entry point)
  if (
    session?.user &&
  req.nextUrl.pathname === "/"
  ) {
  return NextResponse.redirect(new URL("/home", req.nextUrl.origin));
  }

  // Redirect authenticated users from other public routes to "/home"
  if (
    isPublicRoute &&
    session?.user &&
    req.nextUrl.pathname !== "/" &&
    !req.nextUrl.pathname.startsWith("/home")
  ) {
    return NextResponse.redirect(new URL("/home", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

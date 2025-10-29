/**
 * NextAuth.js Configuration
 *
 * This file configures authentication for the HaUIDOC application using NextAuth.js v5.
 * It supports multiple authentication providers including credentials (email/password)
 * and Google OAuth for seamless user authentication.
 *
 * Features:
 * - Email/password authentication with bcrypt hashing
 * - Google OAuth integration for social login
 * - JWT-based sessions with configurable expiration
 * - Automatic user creation for new Google users
 * - Role-based access control (client/admin)
 * - Secure session management
 *
 * @see https://next-auth.js.org/
 */

import { loginSchema } from "@/lib/definition";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "generated/prisma";
import Google from "next-auth/providers/google";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username or Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const identifier = credentials.username;
        const password = credentials.password;

        const parsed = await loginSchema.safeParseAsync({
          username: identifier,
          password,
        });
        if (!parsed.success) {
          throw new Error("Thông tin đăng nhập không hợp lệ");
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ username: identifier }, { email: identifier }],
          },
        });
        if (!user) throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");

        const isPasswordValid = await bcrypt.compare(
          password,
          user.password_hash,
        );
        if (!isPasswordValid)
          throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          major_id: user.major_id,
          image_url: user.image_url,
          role: user.role,
        };
      },
    }),
    Google,
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          const defaultMajor = await prisma.major.findFirst();
          await prisma.user.create({
            data: {
              name: user.name ?? profile?.name ?? "Người dùng Google",
              username:
                (user.email?.split("@")[0] ?? "googleuser") +
                Math.floor(Math.random() * 10000),
              email: user.email,
              image_url: user.image ?? profile?.picture ?? null,
              password_hash: "",
              major_id: defaultMajor ? defaultMajor.id : "",
            },
          });
        } else {
          await prisma.user.update({
            where: { email: user.email },
            data: {
              image_url:
                user.image ?? profile?.picture ?? existingUser.image_url,
              name: user.name ?? profile?.name ?? existingUser.name,
            },
          });
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // Attach user info when signing in
      if (account?.provider === "google" && user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (dbUser) {
          token.user = {
            id: dbUser.id,
            name: dbUser.name,
            username: dbUser.username,
            email: dbUser.email,
            major_id: dbUser.major_id,
            image_url: dbUser.image_url,
            role: dbUser.role,
          };
        }
      } else if (user) {
        // Credential login
        token.user = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          major_id: user.major_id,
          image_url: user.image_url,
          role: user.role,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  basePath: "/api/auth",
  trustHost: true,
});

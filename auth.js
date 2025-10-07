//auth.js

import { loginSchema } from "@/lib/definition";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "generated/prisma";

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
        if (!user) {
          throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.password_hash,
        );
        if (!isPasswordValid) {
          throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          major_id: user.major_id,
          image_url: user.image_url,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          major_id: user.major_id,
          image_url: user.image_url,
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
});

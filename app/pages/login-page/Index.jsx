"use client";

import Link from "next/link";
import { anton } from "@/components/fonts";
import { loginUser } from "@/lib/action";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginUser, undefined);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-12 sm:max-w-lg sm:px-0">
      <h1
        className={`${anton.className} text-primary mb-2 text-center text-3xl font-extrabold`}
      >
        Đăng nhập vào HaUIDOC
      </h1>
      <form className="rounded-lg bg-white p-8 shadow-lg" action={action}>
        <div className="mb-4">
          <label
            className="mb-2 block text-base font-semibold text-gray-700"
            htmlFor="username"
          >
            Tên đăng nhập
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm transition focus:ring-2 focus:outline-none"
            placeholder="Nhập tên đăng nhập"
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-base font-semibold text-gray-700"
            htmlFor="password"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm transition focus:ring-2 focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        {state?.error.message && (
          <div className="pb-6 text-sm text-red-600">{state.error.message}</div>
        )}
        <button
          type="submit"
          disabled={pending}
          className="bg-primary hover:bg-primary/90 w-full rounded-md py-3 text-base font-bold text-white transition"
        >
          Đăng nhập
        </button>
        <div className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="text-secondary hover:text-secondary/80 underline"
          >
            Đăng ký
          </Link>
        </div>
      </form>
    </section>
  );
}

"use client";

import Link from "next/link";
import { anton } from "public/fonts";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        redirect: false, // không redirect tự động
        username,
        password,
      });

      if (result?.error) {
        setError("Tên đăng nhập hoặc mật khẩu không đúng.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      // console.log(err);

      setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="bg-gray-50">
      {" "}
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-12 sm:max-w-lg sm:px-0">
        <h1
          className={`${anton.className} text-primary mb-2 text-center text-3xl font-extrabold`}
        >
          Đăng nhập vào HaUIDOC{" "}
        </h1>{" "}
        <form
          className="rounded-2xl bg-white p-8 shadow-lg"
          onSubmit={handleSubmit}
        >
          {" "}
          <div className="mb-4">
            {" "}
            <label
              className="mb-2 block text-base font-semibold text-gray-700"
              htmlFor="username"
            >
              Tên đăng nhập{" "}
            </label>{" "}
            <input
              id="username"
              name="username"
              type="text"
              required
              className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm transition focus:ring-2 focus:outline-none"
              placeholder="Nhập tên đăng nhập hoặc email"
            />{" "}
          </div>{" "}
          <div className="">
            {" "}
            <label
              className="mb-2 block text-base font-semibold text-gray-700"
              htmlFor="password"
            >
              Mật khẩu{" "}
            </label>{" "}
            <input
              id="password"
              name="password"
              type="password"
              required
              className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm transition focus:ring-2 focus:outline-none"
              placeholder="••••••••"
            />{" "}
          </div>
          ```
          {error && <div className="pb-6 text-sm text-red-600">{error}</div>}
          <div className="flex items-center justify-end py-2">
            <Link
              href="/forgot-password"
              className="text-secondary hover:text-secondary/80 text-sm hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="bg-primary w-full rounded-xl py-3 text-base font-bold text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {pending ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <div className="mt-4 text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="text-secondary hover:text-secondary/80 hover:underline"
            >
              Đăng ký
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

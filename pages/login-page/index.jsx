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
  const [pendingGoogle, setPendingGoogle] = useState(false);

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

  async function handleGoogleSubmit(event) {
    event.preventDefault();
    setPendingGoogle(true);

    const res = await signIn("google");
    console.log(res);
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
            className="bg-primary mb-4 w-full rounded-xl py-3 text-base font-bold text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {pending ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <button
            type="button"
            onClick={handleGoogleSubmit}
            disabled={pendingGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 text-base font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.94 0 7.02 1.6 9.15 3.66l6.8-6.8C36.17 2.7 30.57 0 24 0 14.61 0 6.6 5.64 2.7 13.8l7.9 6.1C12.18 13.24 17.59 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.1 24.5c0-1.55-.14-3.05-.39-4.5H24v9h12.65c-.55 2.8-2.2 5.17-4.7 6.76l7.4 5.76C43.83 37.23 46.1 31.34 46.1 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.6 28.9c-.63-1.9-.98-3.9-.98-6s.35-4.1.98-6L2.7 10.8A23.94 23.94 0 0 0 0 24c0 3.88.93 7.55 2.7 10.8l7.9-6z"
              />
              <path
                fill="#4285F4"
                d="M24 48c6.57 0 12.1-2.17 16.13-5.9l-7.4-5.76c-2.07 1.4-4.73 2.16-8.73 2.16-6.41 0-11.82-3.74-14.4-9.4l-7.9 6.1C6.6 42.36 14.61 48 24 48z"
              />
            </svg>

            <span>
              {pendingGoogle ? "Đang đăng nhập..." : "Đăng nhập với Google"}
            </span>
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

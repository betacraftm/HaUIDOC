"use client";

import Link from "next/link";
import { anton } from "public/fonts";
import { useState } from "react";
import { useRouter } from "next/navigation";
// Removed server action imports - now using API routes
import DropDown from "components/DropDown";

const RegisterPage = ({ majorsList }) => {
  const router = useRouter();
  const [state, setState] = useState(undefined);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (formData) => {
    setPending(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setState(result);
      if (result.success) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setState({ error: "Đã xảy ra lỗi khi đăng ký" });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <section
        className={`mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12`}
      >
        <h1
          className={`${anton.className} text-primary mb-6 text-center text-3xl font-extrabold`}
        >
          Đăng ký tài khoản
        </h1>
        <form
        className="ring-secondary space-y-5 rounded-2xl bg-white p-8 shadow-xl ring-1"
        action={handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-base font-semibold text-gray-800"
            >
              Họ và tên
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:outline-none"
              placeholder="Nhập họ và tên"
            />
            {Array.isArray(state?.error?.name) && state.error.name.length > 0 && (
              <div className="text-sm text-red-600">{state.error.name[0]}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-base font-semibold text-gray-800"
            >
              Tên đăng nhập
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:outline-none"
              placeholder="Nhập tên đăng nhập"
            />
            {Array.isArray(state?.error?.username) && state.error.username.length > 0 && (
              <div className="text-sm text-red-600">{state.error.username[0]}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-base font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:outline-none"
              placeholder="Nhập email"
            />
            {Array.isArray(state?.error?.email) && state.error.email.length > 0 && (
              <div className="text-sm text-red-600">{state.error.email[0]}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-base font-semibold text-gray-800"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:outline-none"
              placeholder="Nhập mật khẩu"
            />
            {Array.isArray(state?.error?.password) && state.error.password.length > 0 && (
              <div className="text-sm text-red-600">{state.error.password[0]}</div>
            )}
          </div>

          <DropDown
            title={"Ngành học"}
            id={"major_name"}
            list={majorsList}
            placeholder={"Nhập ngành học"}
          />
          {state?.error?.message && (
            <div className="text-sm text-red-600">{state.error.message}</div>
          )}

          {typeof state?.error === 'string' && (
            <div className="text-sm text-red-600">{state.error}</div>
          )}
          <button
          type="submit"
          disabled={pending}
          className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-base font-bold text-white transition disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
          >
          {pending ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang đăng ký...
              </>
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-base text-gray-700">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="text-secondary hover:text-secondary/80 underline"
          >
            Đăng nhập
          </Link>
        </p>
      </section>
    </div>
  );
};

export default RegisterPage;

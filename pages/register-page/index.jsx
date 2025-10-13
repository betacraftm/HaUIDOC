"use client";

import Link from "next/link";
import { anton } from "public/fonts";
import { useActionState, useState } from "react";
import { registerUser } from "@/lib/action";
import DropDown from "components/DropDown";

const RegisterPage = ({ majorsList }) => {
  const [state, action, pending] = useActionState(registerUser, undefined);

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
          className="space-y-5 rounded-2xl bg-white p-8 shadow-lg"
          action={action}
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
            {state?.error.name && (
              <div className="text-sm text-red-600">{state.error.name}</div>
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
            {state?.error.username && (
              <div className="text-sm text-red-600">{state.error.username}</div>
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
            {state?.error.email && (
              <div className="text-sm text-red-600">{state.error.email}</div>
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
            {state?.error.password && (
              <div className="text-sm text-red-600">{state.error.password}</div>
            )}
          </div>

          <DropDown
            title={"Ngành học"}
            id={"major_name"}
            list={majorsList}
            placeholder={"Nhập ngành học"}
          />
          {state?.error.message && (
            <div className="text-sm text-red-600">{state.error.message}</div>
          )}
          <button
            type="submit"
            disabled={pending}
            className="bg-primary w-full rounded-xl px-4 py-2 text-base font-bold text-white transition hover:opacity-90"
          >
            Đăng ký
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

"use client";

import Link from "next/link";
import { anton } from "@/ui/fonts";
import { useActionState, useState } from "react";
import { registerUser } from "@/lib/action";

const RegisterPage = ({ majorsList }) => {
  const [majorInput, setMajorInput] = useState("");
  const [filteredMajors, setFilteredMajors] = useState(majorsList);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [state, action, pending] = useActionState(registerUser, undefined);

  const handleMajorChange = (e) => {
    const value = e.target.value;
    setMajorInput(value);
    setFilteredMajors(
      majorsList.filter((major) =>
        major.name.toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setDropdownOpen(true);
  };

  const handleMajorSelect = (name) => {
    setMajorInput(name);
    setDropdownOpen(false);
  };

  const handleMajorFocus = () => {
    setFilteredMajors(majorsList);
    setDropdownOpen(true);
  };

  const handleMajorBlur = () => {
    setTimeout(() => setDropdownOpen(false), 100);
  };

  return (
    <section
      className={`mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12`}
    >
      <h1
        className={`${anton.className} text-primary mb-6 text-center text-3xl font-extrabold`}
      >
        Đăng ký tài khoản
      </h1>
      <form
        className="space-y-5 rounded-lg bg-white p-8 shadow"
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
        <div>
          <label
            htmlFor="major_name"
            className="mb-1 block text-base font-semibold text-gray-800"
          >
            Ngành học
          </label>
          <div className="relative">
            <input
              id="major_name"
              name="major_name"
              type="text"
              autoComplete="off"
              required
              value={majorInput}
              onChange={handleMajorChange}
              onFocus={handleMajorFocus}
              onBlur={handleMajorBlur}
              className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:outline-none"
              placeholder="Nhập ngành học"
            />
            {dropdownOpen && filteredMajors.length > 0 && (
              <ul className="absolute bottom-full z-10 mb-1 max-h-40 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
                {filteredMajors.map((major) => (
                  <li
                    key={major.id}
                    className="hover:bg-primary/10 cursor-pointer px-3 py-1.5 text-sm"
                    onMouseDown={() => handleMajorSelect(major.name)}
                  >
                    {major.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {state?.error.message && (
          <div className="text-sm text-red-600">{state.error.message}</div>
        )}
        <button
          type="submit"
          disabled={pending}
          className="bg-primary hover:bg-primary/90 w-full rounded-md px-4 py-2 text-base font-bold text-white transition"
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
  );
};

export default RegisterPage;

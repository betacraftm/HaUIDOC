"use client";

import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/action";
import { useActionState } from "react";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, formAction, pending] = useActionState(resetPassword, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-primary mb-6 text-center text-3xl font-extrabold">
          Đặt lại mật khẩu
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Nhập mật khẩu mới cho tài khoản của bạn
        </p>

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="token" value={token || ""} />

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-base font-semibold text-gray-700"
            >
              Mật khẩu mới
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu mới"
              required
              className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-300 px-4 py-3 text-base shadow-sm transition focus:ring-2 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-base font-semibold text-gray-700"
            >
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              required
              className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-300 px-4 py-3 text-base shadow-sm transition focus:ring-2 focus:outline-none"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-green-600">{state.success}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base font-bold text-white transition disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
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
                Đang xử lý...
              </>
            ) : (
              "Xác nhận đặt lại mật khẩu"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

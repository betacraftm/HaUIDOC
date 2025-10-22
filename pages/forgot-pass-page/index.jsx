"use client";

import { sendResetPasswordEmail } from "@/lib/action";
import { useActionState } from "react";
import { anton } from "public/fonts";

const ForgotPassword = () => {
  const [state, formAction, pending] = useActionState(
    sendResetPasswordEmail,
    undefined,
  );

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <div className="ring-secondary w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1">
        <h1
          className={`text-primary ${anton.className} mb-6 text-center text-3xl font-extrabold`}
        >
          Quên mật khẩu
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu
        </p>

        <form action={formAction} className="space-y-5">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Nhập email của bạn"
              required
              className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-300 px-4 py-3 text-base shadow-sm transition focus:ring-2 focus:outline-none"
            />
            {state?.error && (
              <p className="mt-2 text-sm text-red-600">{state.error}</p>
            )}
            {state?.success && (
              <p className="mt-2 text-sm text-green-600">{state.success}</p>
            )}
          </div>

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
                Đang gửi...
              </>
            ) : (
              "Gửi email khôi phục"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

"use client";

// Removed server action imports - now using API routes
import { useState } from "react";
import { anton } from "public/fonts";

export default function ResetPassword({ token }) {
const [state, setState] = useState(undefined);
const [pending, setPending] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <div className="ring-secondary w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1">
        <h1
          className={`text-primary ${anton.className} mb-6 text-center text-3xl font-extrabold`}
        >
          Đặt lại mật khẩu
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Nhập mật khẩu mới cho tài khoản của bạn
        </p>

        <form action={(formData) => {
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (password !== confirmPassword) {
        setPasswordError("Mật khẩu xác nhận không khớp");
        return;
        }

        setPasswordError("");
        setPending(true);

        // Create new FormData with only the fields we need
        const cleanFormData = new FormData();
        cleanFormData.append("password", password);

        fetch(`/api/auth/reset-password/${token}`, {
          method: "POST",
          body: cleanFormData,
        })
          .then((response) => response.json())
          .then((result) => {
            setState(result);
          })
          .catch((error) => {
            console.error("Reset password error:", error);
            setState({ error: "Đã xảy ra lỗi khi đặt lại mật khẩu" });
          })
          .finally(() => {
            setPending(false);
          });
        }} className="space-y-5">
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
          <div className="space-y-1">
              {/* Handle field validation errors (objects) */}
              {typeof state.error === 'object' && Array.isArray(state.error.password) && state.error.password.length > 0 && (
                <p className="text-sm text-red-600">{state.error.password[0]}</p>
              )}
              {/* Handle general errors (strings) */}
              {typeof state.error === 'string' && (
                <p className="text-sm text-red-600">{state.error}</p>
              )}

              {/* Handle general message errors */}
              {state.error?.message && (
                <p className="text-sm text-red-600">{state.error.message}</p>
              )}
            </div>
          )}
          {passwordError && (
            <p className="text-sm text-red-600">{passwordError}</p>
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

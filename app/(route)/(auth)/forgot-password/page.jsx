import ForgotPassword from "pages/forgot-pass-page";

export const metadata = {
title: "Quên mật khẩu - HaUIDOC",
  description: "Khôi phục mật khẩu tài khoản HaUIDOC của bạn. Nhận email hướng dẫn đặt lại mật khẩu để tiếp tục truy cập tài liệu học tập.",
  keywords: "quên mật khẩu, khôi phục, email, đặt lại mật khẩu, HaUIDOC",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return <ForgotPassword />;
};

export default Page;

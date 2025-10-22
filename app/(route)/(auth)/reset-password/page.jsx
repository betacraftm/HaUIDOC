import ResetPassword from "pages/reset-pass-page";

export const metadata = {
title: "Đặt lại mật khẩu - HaUIDOC",
  description: "Đặt lại mật khẩu mới cho tài khoản HaUIDOC của bạn. Tạo mật khẩu mạnh để bảo vệ tài khoản và tiếp tục truy cập tài liệu học tập.",
  keywords: "đặt lại mật khẩu, mật khẩu mới, bảo mật, HaUIDOC",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <ResetPassword />;
};

export default page;

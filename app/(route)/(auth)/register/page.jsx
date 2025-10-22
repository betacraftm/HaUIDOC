import RegisterPage from "pages/register-page";
import { fetchMajors } from "@/lib/data";

export const metadata = {
title: "Đăng ký tài khoản - HaUIDOC",
  description: "Tạo tài khoản miễn phí trên HaUIDOC để tải lên tài liệu học tập, tham gia cộng đồng sinh viên Đại học Công nghiệp Hà Nội và nhận nhiều lợi ích khác.",
keywords: "đăng ký, tài khoản, miễn phí, HaUIDOC, sinh viên, Đại học Công nghiệp Hà Nội",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = async () => {
  const majorsList = await fetchMajors();

  return <RegisterPage majorsList={majorsList} />;
};

export default Page;

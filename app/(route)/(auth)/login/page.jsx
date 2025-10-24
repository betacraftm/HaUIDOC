import LoginPage from "components/page-components/LoginPage";

export const metadata = {
title: "Đăng nhập - HaUIDOC",
  description: "Đăng nhập vào tài khoản HaUIDOC để truy cập tài liệu học tập, tải lên tài liệu và tham gia cộng đồng sinh viên Đại học Công nghiệp Hà Nội.",
  keywords: "đăng nhập, tài khoản, HaUIDOC, sinh viên, Đại học Công nghiệp Hà Nội",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return <LoginPage />;
};

export default Page;

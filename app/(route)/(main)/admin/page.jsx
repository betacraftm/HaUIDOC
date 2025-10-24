import AdminPage from "components/page-components/AdminPage";

export const metadata = {
title: "Quản trị - HaUIDOC",
  description: "Bảng điều khiển quản trị HaUIDOC. Quản lý tài liệu, người dùng và thống kê hệ thống.",
  keywords: "quản trị, admin, dashboard, quản lý, HaUIDOC",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <AdminPage />;
};

export default page;

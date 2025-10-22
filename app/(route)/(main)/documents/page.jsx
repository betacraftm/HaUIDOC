import { getSession } from "@/lib/getSession";
import { getDocuments } from "@/lib/data";
import DocumentsPage from "pages/documents-page";

export const metadata = {
title: "Tài liệu học tập - HaUIDOC",
description: "Duyệt và tìm kiếm hàng nghìn tài liệu học tập Đại học Công nghiệp Hà Nội. Phân loại theo môn học, khoa, ngành với giao diện tìm kiếm thông minh.",
keywords: "tài liệu học tập, PDF, môn học, khoa học, ngành học, tìm kiếm tài liệu, HaUI, Đại học Công nghiệp Hà Nội",
openGraph: {
    title: "Tài liệu học tập - HaUIDOC",
  description: "Duyệt và tìm kiếm hàng nghìn tài liệu học tập Đại học Công nghiệp Hà Nội",
    url: "/documents",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tài liệu học tập - HaUIDOC",
    description: "Duyệt và tìm kiếm hàng nghìn tài liệu học tập Đại học Công nghiệp Hà Nội",
  },
};

const page = async ({ searchParams }) => {
  const query = await searchParams;
  const section = query.section || "recently";
  const page = query.page || 1;
  const userId = (await getSession()).id;

  return <DocumentsPage section={section} page={page} userId={userId} />;
};

export default page;

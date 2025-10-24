import { fetchSubjects } from "@/lib/data";
import UploadPage from "components/page-components/UploadPage";

export const metadata = {
title: "Tải lên tài liệu - HaUIDOC",
  description: "Tải lên tài liệu học tập của bạn để chia sẻ với cộng đồng sinh viên Đại học Công nghiệp Hà Nội. Hỗ trợ PDF, DOC, DOCX với dung lượng tối đa 5MB.",
keywords: "tải lên, tài liệu, PDF, DOC, chia sẻ, HaUI, Đại học Công nghiệp Hà Nội",
};

const page = async () => {
  const subjectsList = await fetchSubjects();

  return <UploadPage subjectsList={subjectsList} />;
};

export default page;

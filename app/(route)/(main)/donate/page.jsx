import DonatePage from "pages/donate-page";

export const metadata = {
title: "Ủng hộ HaUIDOC",
description: "Ủng hộ dự án HaUIDOC để duy trì và phát triển nền tảng chia sẻ tài liệu học tập cho sinh viên Đại học Công nghiệp Hà Nội.",
keywords: "ủng hộ, donate, quyên góp, HaUIDOC, tài trợ, phi lợi nhuận",
openGraph: {
  title: "Ủng hộ HaUIDOC",
    description: "Hãy ủng hộ HaUIDOC để chúng tôi có thể duy trì và cải thiện nền tảng chia sẻ tài liệu học tập miễn phí.",
    url: "/donate",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ủng hộ HaUIDOC",
    description: "Hãy ủng hộ HaUIDOC để duy trì nền tảng chia sẻ tài liệu học tập miễn phí",
  },
};

const page = () => {
  return (
    <main className="bg-gray-50">
      <DonatePage />
    </main>
  );
};

export default page;

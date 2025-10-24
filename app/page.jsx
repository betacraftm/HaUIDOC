import HomePage from "components/page-components/HeroPage";

export const metadata = {
title: "HaUIDOC - Nền tảng chia sẻ tài liệu học tập Đại học Công nghiệp Hà Nội",
  description: "HaUIDOC là nền tảng chia sẻ tài liệu học tập dành riêng cho sinh viên Trường Đại học Công nghiệp Hà Nội (HaUI). Truy cập hàng nghìn tài liệu học tập, tìm kiếm theo môn học, tải xuống miễn phí.",
  keywords: "HaUI, Đại học Công nghiệp Hà Nội, tài liệu học tập, sinh viên, chia sẻ tài liệu, PDF, môn học, kỳ thi, nghiên cứu",
  authors: [{ name: "Hoàng Ngọc Đạt" }],
  creator: "Hoàng Ngọc Đạt",
  publisher: "HaUIDOC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://haui-doc.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HaUIDOC - Học tập dễ dàng hơn với Đại học Công nghiệp Hà Nội",
    description: "Nền tảng chia sẻ tài liệu học tập hàng đầu dành cho sinh viên HaUI. Tìm kiếm, tải xuống tài liệu miễn phí với giao diện hiện đại và thân thiện.",
    url: "https://haui-doc.vercel.app",
    siteName: "HaUIDOC",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HaUIDOC - Nền tảng chia sẻ tài liệu học tập HaUI",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HaUIDOC - Tài liệu học tập HaUI",
    description: "Nền tảng chia sẻ tài liệu học tập dành cho sinh viên Đại học Công nghiệp Hà Nội",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return <HomePage />;
}

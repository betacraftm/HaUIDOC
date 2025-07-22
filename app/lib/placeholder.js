const latestDocuments = [
  {
    id: 1,
    title: "Bài giảng Kỹ thuật phần mềm nâng cao",
    description: "Tóm tắt các kiến thức về OOP, Design Patterns và Agile.",
    type: "Lecture Notes",
    imageUrl: "/placeholders/doc1.jpg",
  },
  {
    id: 2,
    title: "Đề thi giữa kỳ môn Cấu trúc dữ liệu",
    description: "Các dạng bài tập về cây nhị phân, danh sách liên kết.",
    type: "Exam Paper",
    imageUrl: "/placeholders/doc2.jpg",
  },
  {
    id: 3,
    title: "Báo cáo cuối kỳ dự án Website HaUIDOC",
    description: "Báo cáo về quy trình phát triển và các tính năng chính.",
    type: "Report",
    imageUrl: "/placeholders/doc3.jpg",
  },
  {
    id: 4,
    title: "Tài liệu hướng dẫn sử dụng Moodle",
    description:
      "Hướng dẫn chi tiết cách sử dụng hệ thống Moodle cho sinh viên.",
    type: "Guide",
    imageUrl: "/placeholders/doc4.jpg",
  },
  {
    id: 5,
    title: "Luận văn tốt nghiệp: Ứng dụng AI trong y tế",
    description: "Nghiên cứu về các mô hình AI trong chẩn đoán bệnh.",
    type: "Thesis",
    imageUrl: "/placeholders/doc5.jpg",
  },
];

const recentlyViewed = [
  {
    id: 8,
    title: "Lịch sử kinh tế Việt Nam 2024",
    description: "Tổng quan các giai đoạn phát triển kinh tế VN.",
    type: "Book Chapter",
    imageUrl: "/placeholders/doc8.jpg",
  },
  {
    id: 9,
    title: "Nguyên lý Marketing cơ bản",
    description: "Các khái niệm và chiến lược Marketing cốt lõi.",
    type: "Textbook",
    imageUrl: "/placeholders/doc9.jpg",
  },
  {
    id: 10,
    title: "Nghiên cứu về blockchain và ứng dụng",
    description: "Giới thiệu công nghệ blockchain và các ứng dụng tiềm năng.",
    type: "Research Paper",
    imageUrl: "/placeholders/doc10.jpg",
  },
  {
    id: 11,
    title: "Giáo trình Java nâng cao",
    description: "Các chủ đề về JavaFX, Multithreading, JDBC.",
    type: "Course Material",
    imageUrl: "/placeholders/doc11.jpg",
  },
  {
    id: 12,
    title: "Cẩm nang phỏng vấn IT",
    description: "Bộ câu hỏi phỏng vấn phổ biến ngành IT và cách trả lời.",
    type: "Guide",
    imageUrl: "/placeholders/doc12.jpg",
  },
];

const likedDocuments = [
  {
    id: 14,
    title: "Tiếng Anh chuyên ngành CNTT",
    description: "Từ vựng và cấu trúc câu thông dụng trong CNTT.",
    type: "Study Aid",
    imageUrl: "/placeholders/doc14.jpg",
  },
  {
    id: 15,
    title: "Bài tập lớn Mạng máy tính",
    description: "Phân tích và thiết kế mạng LAN/WAN.",
    type: "Project",
    imageUrl: "/placeholders/doc15.jpg",
  },
  {
    id: 16,
    title: "Công nghệ Web hiện đại",
    description: "Giới thiệu về React, Vue, Angular và Node.js.",
    type: "Lecture Notes",
    imageUrl: "/placeholders/doc16.jpg",
  },
];

const myDocuments = [
  {
    id: 17,
    title: "Đồ án tốt nghiệp: Hệ thống quản lý thư viện",
    description: "Chi tiết về database, backend và frontend.",
    type: "Thesis",
    imageUrl: "/placeholders/doc17.jpg",
  },
  {
    id: 18,
    title: "Bài tập nhóm Kinh tế vi mô",
    description: "Phân tích thị trường và hành vi người tiêu dùng.",
    type: "Group Work",
    imageUrl: "/placeholders/doc18.jpg",
  },
  {
    id: 19,
    title: "Kế hoạch học tập cá nhân",
    description: "Mục tiêu và lộ trình học tập cho học kỳ mới.",
    type: "Personal",
    imageUrl: "/placeholders/doc19.jpg",
  },
  {
    id: 20,
    title: "Tài liệu tham khảo AI",
    description: "Các bài báo khoa học và sách về trí tuệ nhân tạo.",
    type: "Research",
    imageUrl: "/placeholders/doc20.jpg",
  },
];

export { recentlyViewed, likedDocuments, myDocuments, latestDocuments };

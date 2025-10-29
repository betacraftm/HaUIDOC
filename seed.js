import { PrismaClient } from "./generated/prisma/index.js";

const MAJORS = [
  "An toàn thông tin",
  "Công nghệ dệt, may",
  "Công nghệ đa phương tiện",
  "Công nghệ kỹ thuật cơ điện tử",
  "Công nghệ kỹ thuật cơ điện tử ô tô",
  "Công nghệ kỹ thuật cơ khí",
  "Công nghệ kỹ thuật điện tử - viễn thông",
  "Công nghệ kỹ thuật điện tử y sinh",
  "Công nghệ kỹ thuật điện, điện tử",
  "Công nghệ kỹ thuật điều khiển và tự động hóa",
  "Công nghệ kỹ thuật hoá học",
  "Công nghệ kỹ thuật khuôn mẫu",
  "Công nghệ kỹ thuật máy tính",
  "Công nghệ kỹ thuật môi trường",
  "Công nghệ kỹ thuật nhiệt",
  "Công nghệ kỹ thuật ô tô",
  "Công nghệ thông tin",
  "Công nghệ thực phẩm",
  "Công nghệ vật liệu dệt, may",
  "Du lịch",
  "Hệ thống thông tin",
  "Hóa dược",
  "Kế toán",
  "Khoa học máy tính",
  "Kiểm toán",
  "Kinh tế đầu tư",
  "Kỹ thuật cơ khí động lực",
  "Kỹ thuật hệ thống công nghiệp",
  "Kỹ thuật phần mềm",
  "Kỹ thuật sản xuất thông minh",
  "Logistics và quản lý chuỗi cung ứng",
  "Mạng máy tính và truyền thông dữ liệu",
  "Marketing",
  "Năng lượng tái tạo",
  "Ngôn ngữ Anh",
  "Ngôn ngữ Hàn Quốc",
  "Ngôn ngữ học",
  "Ngôn ngữ Nhật",
  "Ngôn ngữ Trung Quốc",
  "Ngôn ngữ Trung Quốc (LK2+2 với ĐHKHKT Quảng Tây)",
  "Phân tích dữ liệu kinh doanh",
  "Quản trị dịch vụ du lịch và lữ hành",
  "Quản trị khách sạn",
  "Quản trị kinh doanh",
  "Quản trị nhà hàng và dịch vụ ăn uống",
  "Quản trị nhân lực",
  "Quản trị văn phòng",
  "Robot và trí tuệ nhân tạo",
  "Tài chính – Ngân hàng",
  "Thiết kế cơ khí và kiểu dáng công nghiệp",
  "Thiết kế thời trang",
  "Trung Quốc học",
];

const SUBJECTS = [
  "Triết học Mác-Lênin",
  "Giao tiếp liên văn hóa",
  "Quản lý dự án",
  "Đại số tuyến tính",
  "Giải tích",
  "Nhập môn về kỹ thuật",
  "Kinh tế chính trị Mác-Lênin",
  "Vật lý 1",
  "Xác suất thống kê",
  "Kỹ năng hoạt động công nghiệp",
  "Vật liệu và linh kiện điện tử",
  "Tiếng Anh Điện-Điện tử cơ bản 2",
  "Âm nhạc đại cương",
  "Nghệ thuật học đại cương",
  "Mỹ thuật đại cương",
  "Toán rời rạc",
  "Điện tử tương tự",
  "Lý thuyết mạch",
  "Tín hiệu và hệ thống",
  "Thực hành Điện tử cơ bản",
  "Kỹ thuật lập trình nhúng",
  "Phương pháp tính",
  "Toán kỹ thuật",
  "Chủ nghĩa xã hội khoa học",
  "Lập trình hướng đối tượng",
  "Điện tử số",
  "Thực hành điện tử tương tự",
  "Lập trình Python",
  "Kiến trúc máy tính và hệ điều hành",
  "Lịch sử Đảng Cộng sản Việt Nam",
  "Cấu trúc dữ liệu và giải thuật",
  "Xử lý tín hiệu số",
  "CAD trong điện tử",
  "Vi xử lý và cấu trúc máy tính",
  "Kiểm thử phần mềm",
  "Tư tưởng Hồ Chí Minh",
  "Đồ án cơ sở ngành",
  "Mạng máy tính và truyền thông",
  "Vi điều khiển",
  "Mạng nơ-ron nhân tạo",
  "Phát triển ứng dụng trên thiết bị di động",
  "Pháp luật đại cương",
  "Đồ án chuyên ngành",
  "Thiết kế ứng dụng trên máy tính nhúng",
  "Lập trình .NET",
  "Đo lường điều khiển bằng máy tính",
  "Thiết kế hệ thống số dùng HDL",
  "Lập trình mạng và truyền thông",
  "Học máy và nhận dạng",
  "Hệ thống nhúng cho truyền thông dữ liệu",
  "Xử lý ảnh",
  "Phát triển phần mềm dựa trên mã nguồn mở",
];

const prisma = new PrismaClient();

async function seedData() {
  try {
    const majors = await prisma.major.findMany();
    const subjects = await prisma.subject.findMany();

    if (majors.length === 0) {
      await prisma.major.createMany({
        data: [
          ...MAJORS.map((major) => ({
            name: major,
          })),
        ],
      });
    }

    if (subjects.length === 0) {
      await prisma.subject.createMany({
        data: [
          ...SUBJECTS.map((subject) => ({
            name: subject,
          })),
        ],
      });
    }

    console.log("Data seeded successfully");
  } catch (error) {
    console.error(error);
  }
}

seedData();

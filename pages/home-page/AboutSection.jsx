import { anton } from "public/fonts";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-md scroll-m-20 text-left sm:max-w-lg"
    >
      <h2
        className={`${anton.className} mb-4 text-2xl font-extrabold sm:text-3xl`}
      >
        Giới thiệu về HaUIDOC
      </h2>

      <h3 className={`${anton.className} mb-2 text-xl font-bold`}>
        HaUIDOC là gì?
      </h3>
      <p className="mb-4 text-base text-gray-800">
        HaUIDOC là một giải pháp được tạo ra để giải quyết chính vấn đề trên.
        Đây là một nền tảng lưu trữ và chia sẻ tài liệu học tập tập trung, được
        xây dựng dành riêng cho cộng đồng sinh viên Đại học Công nghiệp Hà Nội
        (HaUI). Mục tiêu là tạo ra một môi trường gọn gàng, có tổ chức, giúp mọi
        người có thể dễ dàng tìm kiếm, tải xuống và đóng góp tài liệu cho nhau.
      </p>

      <h3 className={`${anton.className} mb-2 text-xl font-bold`}>
        Các tính năng chính
      </h3>
      <ul className="mb-4 list-disc space-y-1 pl-5 text-base text-gray-800">
        <li>
          Sắp xếp khoa học: Mọi tài liệu đều được phân loại theo Khoa và Môn
          học, giúp bạn truy cập đúng thứ mình cần.
        </li>
        <li>
          Tải lên đơn giản: Bất kỳ ai cũng có thể đóng góp tài liệu cho cộng
          đồng chỉ với vài thao tác.
        </li>
        <li>
          Hoàn toàn miễn phí: Dự án được xây dựng với mục đích phi lợi nhuận,
          phục vụ cộng đồng.
        </li>
      </ul>

      <h3 className={`${anton.className} mb-2 text-xl font-bold`}>
        Về tác giả &amp; Liên hệ
      </h3>
      <p className="mb-2 text-base text-gray-800">
        Chào bạn, mình là Hoàng Ngọc Đạt, sinh viên ngành Kỹ Thuật Máy Tính và
        là người đã tạo ra trang web này. HaUIDOC là một dự án cá nhân xuất phát
        từ chính những trải nghiệm của mình tại trường. Nếu bạn có bất kỳ câu
        hỏi, ý tưởng đóng góp hay phát hiện lỗi, xin đừng ngần ngại liên hệ với
        mình qua&nbsp;
        <a
          href="mailto:hoangkimc9@gmail.com"
          className="text-secondary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          email
        </a>
        &nbsp;hoặc&nbsp;
        <a
          href="https://www.facebook.com/ngocdat204"
          className="text-secondary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          facebook
        </a>
        .
      </p>
    </section>
  );
};

export default AboutSection;

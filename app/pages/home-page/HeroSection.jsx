import { Search } from "lucide-react";
import { anton } from "../../components/fonts";

const HeroSection = () => {
  return (
    <section id="hero">
      <h1
        className={`${anton.className} text-4xl leading-14 sm:text-5xl sm:leading-20`}
      >
        Học và thi dễ dàng hơn với{" "}
        <span className="text-secondary">HaUIDOC</span>
      </h1>
      <p className="sm:text-xl">
        Nền tảng chia sẻ tài liệu học tập dành riêng cho sinh viên Đại học Công
        nghiệp Hà Nội
      </p>
      <div className="relative mx-auto mt-6 w-full sm:max-w-md">
        <input
          type="text"
          placeholder="Tìm kiếm tài liệu, khóa học, hoặc đề tài..."
          className="focus:ring-primary w-full rounded-full border border-gray-300 py-3 pr-12 pl-4 shadow transition focus:ring-2 focus:outline-none"
        />
        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </span>
      </div>
      <div className="mx-auto w-1/2 border-b border-black py-8 sm:w-full"></div>
    </section>
  );
};

export default HeroSection;

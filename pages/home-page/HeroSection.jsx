import { anton } from "public/fonts";

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
      <div className="mx-auto w-1/2 border-b border-black py-8 sm:w-full"></div>
    </section>
  );
};

export default HeroSection;

import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[90vh] items-center justify-center bg-white p-4 text-gray-800">
      <div className="flex flex-col items-center text-center">
        {/* Tiêu đề lỗi */}
        <h1 className="text-primary text-9xl font-extrabold tracking-widest">
          404
        </h1>

        {/* Thông báo lỗi */}
        <p className="text-secondary mt-5 text-xl font-medium md:text-2xl">
          Nội dung bạn tìm kiếm không tồn tại
        </p>

        {/* Nút quay lại trang chủ */}
        <Link href="/">
          <p className="bg-primary mt-6 inline-block transform rounded-full px-6 py-3 text-sm font-semibold text-white transition duration-100 hover:opacity-90">
            Quay lại trang chủ
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

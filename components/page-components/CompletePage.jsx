import Link from "next/link";
import { CheckCircle, PlusCircle, FileText } from "lucide-react";

const CompletePage = ({ docId }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 lg:p-12">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Main */}
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <CheckCircle
            className="mb-4 h-16 w-16 text-green-500"
            strokeWidth={2}
          />
          <h1 className="mb-2 text-2xl font-extrabold text-gray-900">
            Chúc mừng bạn đã tải tài liệu thành công!
          </h1>
          <p className="mb-8 text-gray-600">
            Tài liệu của bạn đã được lưu lại. Bạn có thể tiếp tục tải lên thêm
            tài liệu hoặc xem ngay tài liệu vừa đăng.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Upload more */}
            <Link
              href="/upload"
              className="bg-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              <PlusCircle size={22} strokeWidth={2} />
              Upload thêm tài liệu
            </Link>

            {/* View document */}
            <Link
              href={`/documents/${docId}`}
              className="border-primary text-primary hover:bg-primary inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 font-semibold shadow-sm transition hover:text-white"
            >
              <FileText size={22} strokeWidth={2} />
              Xem tài liệu vừa đăng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletePage;

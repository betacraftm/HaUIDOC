// components/DocumentCard.jsx
import { formatDate } from "@/utils/utils";
import Link from "next/link";

const DocumentCard = ({ title, subject, linkUrl, metaData, doc }) => {
  let customTimeData = undefined;

  if (metaData?.createdAtShow) {
    customTimeData = `Ngày đăng: ${formatDate(doc?.created_at?.toString())}`;
  }

  if (metaData?.viewedAtShow) {
    const createdAt = new Date(doc.viewed_at);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - createdAt.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      customTimeData = `Đã xem ${diffInSeconds} giây trước`;
    } else if (diffInMinutes < 60) {
      customTimeData = `Đã xem ${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
      customTimeData = `Đã xem ${diffInHours} giờ trước`;
    } else {
      customTimeData = `Đã xem ${diffInDays} ngày trước`;
    }
  }
  return (
    <Link
      href={linkUrl}
      className="group block w-full border-b border-b-gray-300 py-6 transition-colors duration-200 hover:bg-gray-50"
    >
      <div className="flex flex-col px-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0 sm:w-2/3">
          <h3 className="line-clamp-2 text-xl font-bold text-gray-800 transition-colors duration-200">
            {title}
          </h3>
        </div>

        <button className="group-hover:bg-primary mt-2 hidden w-full rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-white sm:mt-0 sm:block sm:w-auto">
          READ MORE
        </button>
      </div>

      <div className="ml-4 flex flex-col gap-4 pr-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="border-primary text-secondary inline-block rounded-full border p-2 text-sm sm:mt-2">
          {subject && <span>{subject}</span>}
        </div>
        <div className="text-secondary">{<span>{customTimeData}</span>}</div>
      </div>
    </Link>
  );
};

export default DocumentCard;

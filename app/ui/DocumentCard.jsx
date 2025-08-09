// components/DocumentCard.jsx
import Link from "next/link";

const DocumentCard = ({ title, date, subject, linkUrl }) => {
  return (
    <Link
      href={linkUrl}
      className="group block w-full border-b py-6 transition-colors duration-200 hover:bg-gray-50"
    >
      <div className="flex flex-col px-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0 sm:w-2/3">
          <h3 className="line-clamp-2 text-xl font-bold text-gray-800 transition-colors duration-200">
            {title}
          </h3>
        </div>

        <button className="group-hover:bg-primary mt-2 hidden w-full rounded border px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-white sm:mt-0 sm:block sm:w-auto">
          READ MORE
        </button>
      </div>

      <div className="ml-4 flex flex-col gap-4 pr-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="border-primary text-secondary inline-block rounded-full border p-2 text-sm sm:mt-2">
          {subject && <span>{subject}</span>}
        </div>
        <div className="text-secondary">
          {date && <span>Ngày đăng: {date}</span>}
        </div>
      </div>
    </Link>
  );
};

export default DocumentCard;

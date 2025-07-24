// components/DocumentCard.jsx
import Image from "next/image";
import Link from "next/link";

const DocumentCard = ({ title, description, imageUrl, linkUrl = "#" }) => {
  return (
    <Link
      href={linkUrl}
      className="block h-72 w-60 overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <div className="relative flex h-36 w-full items-center justify-center bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={100} // Điều chỉnh kích thước phù hợp với card
            height={100} // 144px = h-36
            objectFit="cover"
            className="h-full w-full"
          />
        ) : (
          <span className="text-sm text-gray-400">Preview</span>
        )}
      </div>
      <div className="p-3">
        <h3 className="group-hover:text-primary line-clamp-2 text-base font-semibold text-gray-800 transition-colors duration-200">
          {title}
        </h3>
        {description && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default DocumentCard;

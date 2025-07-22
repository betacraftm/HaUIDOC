import DocumentCard from "@/ui/DocumentCard";
import { Search } from "lucide-react";
import {
  recentlyViewed,
  latestDocuments,
  likedDocuments,
  myDocuments,
} from "@/lib/placeholder";
import Link from "next/link";

const DashBoard = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="relative mb-8 overflow-hidden rounded-full bg-white shadow-md">
        <input
          type="text"
          placeholder="Tìm kiếm tài liệu, khóa học, hoặc đề tài..."
          className="focus:ring-primary-light w-full rounded-full py-3 pr-12 pl-5 text-lg transition-all duration-200 focus:ring-2 focus:outline-none"
        />
        <button className="text-primary absolute top-0 right-0 flex h-full w-12 items-center justify-center rounded-full bg-white transition-colors duration-200 hover:bg-gray-50">
          <Search className="h-6 w-6" />
        </button>
      </div>

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Tài liệu mới nhất
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {latestDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              description={doc.description}
              type={doc.type}
              imageUrl={doc.imageUrl}
            />
          ))}
        </div>
        {latestDocuments.length >= 5 && (
          <div className="mt-8 text-center">
            <Link
              href="/latest-documents"
              className="text-primary font-semibold hover:underline"
            >
              Xem tất cả tài liệu mới nhất &rarr;
            </Link>
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Tài liệu bạn đã xem gần đây
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {recentlyViewed.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              description={doc.description}
              type={doc.type}
              imageUrl={doc.imageUrl}
            />
          ))}
        </div>

        {recentlyViewed.length >= 5 && (
          <div className="mt-8 text-center">
            <Link
              href="/recently-viewed"
              className="text-primary font-semibold hover:underline"
            >
              Xem tất cả tài liệu đã xem gần đây &rarr;
            </Link>
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Tài liệu đã thích
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {likedDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              description={doc.description}
              type={doc.type}
              imageUrl={doc.imageUrl}
            />
          ))}
        </div>

        {likedDocuments.length >= 5 && (
          <div className="mt-8 text-center">
            <Link
              href="/liked-documents"
              className="text-primary font-semibold hover:underline"
            >
              Xem tất cả tài liệu đã thích &rarr;
            </Link>
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Tài liệu của tôi
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {myDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              description={doc.description}
              type={doc.type}
              imageUrl={doc.imageUrl}
            />
          ))}
        </div>

        {myDocuments.length >= 5 && (
          <div className="mt-8 text-center">
            <Link
              href="/my-documents"
              className="text-primary font-semibold hover:underline"
            >
              Xem tất cả tài liệu của tôi &rarr;
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default DashBoard;

"use client";

import { getDocuments } from "@/lib/data";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DocumentCard from "@/components/DocumentCard";

const DocumentsPage = ({ section, page: initialPage, userId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [documents, setDocuments] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(initialPage || 1);
  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const sectionDefenition = {};
  switch (section) {
    case "recently":
      sectionDefenition.title = "Tài liệu gần đây";
      sectionDefenition.metadata = {
        createdAtShow: true,
      };
      break;

    case "viewed":
      sectionDefenition.title = "Tài liệu bạn đã xem gần đây";
      sectionDefenition.metadata = {
        viewedAtShow: true,
      };
      break;

    case "liked":
      sectionDefenition.title = "Tài liệu bạn đã thích";
      break;

    case "user-doc":
      sectionDefenition.title = "Tài liệu bạn đã đăng";
      sectionDefenition.metadata = {
        createdAtShow: true,
      };
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { documents, total } = await getDocuments(section, page, userId);
      setDocuments(documents);
      setTotal(total);
      setIsLoading(false);
    };
    fetchData();
  }, [section, page, userId]);

  useEffect(() => {
    const paramPage = parseInt(searchParams.get("page")) || 1;
    if (paramPage !== page) {
      setPage(paramPage);
    }
  }, [searchParams]);

  const goToPage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    params.set("section", section);
    router.push(`/documents?${params.toString()}`);
    setPage(newPage);
  };

  // Tạo danh sách số trang
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-7xl bg-white px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          {sectionDefenition.title}
        </h2>

        {isLoading ? (
          <p>Đang tải...</p>
        ) : (
          <>
            <div className="hide-scrollbar grid grid-cols-1 overflow-x-auto">
              {documents.map((doc) => (
                <div key={doc.id}>
                  <DocumentCard
                    title={doc.title}
                    subject={doc?.subjects.name}
                    linkUrl={`/documents/${doc.id}`}
                    metaData={sectionDefenition.metadata}
                    doc={doc}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-center space-x-2">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="hover:bg-primary hover:border-primary cursor-pointer rounded-xl border px-3 py-1 transition-all duration-75 hover:text-white disabled:opacity-50 disabled:transition-none disabled:hover:border-black disabled:hover:bg-white disabled:hover:text-black"
              >
                Trước
              </button>

              {getPageNumbers().map((p, idx) =>
                p === "..." ? (
                  <span key={idx} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`hover:bg-primary hover:border-primary cursor-pointer rounded-full border px-3 py-1 transition-all duration-75 hover:text-white ${
                      p === page ? "bg-primary border-primary text-white" : ""
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="hover:bg-primary hover:border-primary cursor-pointer rounded-xl border px-3 py-1 transition-all duration-75 hover:text-white disabled:opacity-50 disabled:transition-none disabled:hover:border-black disabled:hover:bg-white disabled:hover:text-black"
              >
                Sau
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;

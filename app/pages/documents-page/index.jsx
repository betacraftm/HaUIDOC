"use client";

import { getDocuments } from "@/lib/data";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DocumentCard from "@/components/DocumentCard";
import DocumentSkeleton from "@/components/skeletons/DocumentSkeleton";

const DocumentsPage = ({ section, userId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [documents, setDocuments] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const PAGE_SIZE = 10;

  const paramPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(Math.max(paramPage, 1), totalPages || 1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { documents, total } = await getDocuments(
        section,
        safePage,
        userId,
      );
      setDocuments(documents);
      setTotal(total);
      setIsLoading(false);
    };
    fetchData();
  }, [section, safePage, userId]);

  useEffect(() => {
    if (paramPage !== safePage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", safePage.toString());
      if (section) params.set("section", section);

      router.replace(`/documents?${params.toString()}`);
    }
  }, [paramPage, safePage, section, searchParams, router]);

  const goToPage = (newPage) => {
    const nextPage = Math.min(Math.max(newPage, 1), totalPages);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", nextPage.toString());
    if (section) params.set("section", section);

    router.push(`/documents?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (safePage <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (safePage >= totalPages - 2) {
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
        pages.push(
          1,
          "...",
          safePage - 1,
          safePage,
          safePage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-7xl bg-white px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          {section === "recently"
            ? "Tài liệu mới nhất"
            : section === "viewed"
              ? "Tài liệu bạn đã xem"
              : section === "liked"
                ? "Tài liệu bạn đã thích"
                : "Tài liệu bạn đã đăng"}
        </h2>

        {isLoading ? (
          Array.from({ length: 7 }).map((_, idx) => {
            return <DocumentSkeleton key={idx} />;
          })
        ) : (
          <>
            <div className="hide-scrollbar grid grid-cols-1 overflow-x-auto">
              {documents.map((doc) => (
                <div key={doc.id}>
                  <DocumentCard
                    title={doc.title}
                    subject={doc?.subjects.name}
                    linkUrl={`/documents/${doc.id}`}
                    metaData={{
                      createdAtShow:
                        section === "recently" || section === "user-doc",
                      viewedAtShow: section === "viewed",
                    }}
                    doc={doc}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-center space-x-2">
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
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
                      p === safePage
                        ? "bg-primary border-primary text-white"
                        : ""
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
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

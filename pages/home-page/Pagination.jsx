"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ total, page }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const PAGE_SIZE = 10;

  const paramPage = parseInt(page, 10);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(Math.max(paramPage, 1), totalPages || 1);

  const goToPage = (newPage) => {
    const nextPage = Math.min(Math.max(newPage, 1), totalPages);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", nextPage.toString());

    router.push(`/home?${params.toString()}`);
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
              p === safePage ? "bg-primary border-primary text-white" : ""
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
  );
};

export default Pagination;

"use client";

import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      params.set("page", 1);
    } else {
      params.delete("query");
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative mb-8 overflow-hidden rounded-full bg-white shadow-md">
      <input
        type="text"
        placeholder="Tìm kiếm tài liệu, khóa học, hoặc đề tài..."
        className="focus:ring-primary-light w-full rounded-full py-3 pr-12 pl-5 text-lg transition-all duration-200 focus:ring-2 focus:outline-none"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <span className="text-primary absolute top-0 right-0 flex h-full w-12 items-center justify-center rounded-full bg-white transition-colors duration-200 hover:bg-gray-50">
        <Search className="h-6 w-6" />
      </span>
    </div>
  );
};

export default SearchBar;

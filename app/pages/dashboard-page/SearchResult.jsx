import DocumentCard from "@/components/DocumentCard";
import { searchDocuments } from "@/lib/data";
import { FileSearch } from "lucide-react";
import Pagination from "./Pagination";

const SearchResult = async ({ query, page = 1 }) => {
  const { documents, total } = await searchDocuments(query, page);

  return (
    <div>
      {documents.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-30 text-center">
          <FileSearch size={70} className="text-primary mb-4" />
          <h2 className="mb-2 text-lg font-semibold text-gray-700">
            Không tìm thấy tài liệu
          </h2>
          <p className="text-sm text-gray-500">
            Hãy thử nhập từ khóa khác hoặc kiểm tra chính tả nhé.
          </p>
        </div>
      ) : (
        <div className="min-h-screen">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Kết quả tìm kiếm
          </h2>

          <div className="hide-scrollbar grid grid-cols-1 overflow-x-auto">
            {documents.map((doc) => (
              <div key={doc.id}>
                <DocumentCard
                  title={doc.title}
                  subject={doc?.subjects.name}
                  linkUrl={`/documents/${doc.id}`}
                  metaData={{ createdAtShow: true }}
                  doc={doc}
                />
              </div>
            ))}
          </div>

          <Pagination page={page} total={total} />
        </div>
      )}
    </div>
  );
};

export default SearchResult;

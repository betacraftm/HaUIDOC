"use client";

import { viewedDocument } from "@/lib/action";
import { generateDateString } from "@/utils/utils";
import Link from "next/link";
import { useEffect } from "react";
import { MoveLeft, User, Download } from "lucide-react";
import PDFViewer from "@/components/PDFViewer";

const DocumentDetail = ({ docId, userId, doc }) => {
  useEffect(() => {
    const updateView = async () => {
      try {
        await viewedDocument(userId, docId);
      } catch (err) {
        console.warn("view update failed", err);
      }
    };

    updateView();
  }, [userId, docId]);

  return (
    <div>
      <div className="min-h-screen p-6 lg:p-12">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white">
          <div className="border-b border-gray-200">
            <Link
              href={"/dashboard"}
              rel="noopener noreferrer"
              className="group transition duration-100"
            >
              <p className="text-secondary hover:text-primary mb-4 underline">
                <MoveLeft className="text-secondary group-hover:text-primary mr-2 inline-block" />
                Quay về trang chủ
              </p>
            </Link>

            <h1 className="mb-2 text-3xl leading-tight font-extrabold text-black sm:text-4xl">
              {doc.title}
            </h1>
            <div className="text-secondary flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-0">
              <div className="flex items-center">
                <User className="mr-1" size={18} />
                <span className="text-secondary font-semibold">
                  {doc.users.name}
                </span>
              </div>
              <span className="mx-2 hidden sm:inline-block">•</span>
              <span>Đã đăng vào {generateDateString(doc.created_at)}</span>
            </div>
          </div>

          <div className="mt-8">
            {doc?.desc && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Mô tả tài liệu
                </h2>
                <p className="mb-6 text-gray-600">{doc.desc}</p>
              </div>
            )}

            <PDFViewer
              file={`/api/proxy?url=${encodeURIComponent(doc.file_url)}`}
            />

            <div className="flex justify-center sm:justify-start">
              <Link
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary text-primary hover:bg-primary inline-flex w-full items-center justify-center rounded-lg border px-6 py-3 font-bold shadow-md transition-colors hover:text-white sm:w-auto"
              >
                <Download className="mr-3" size={24} strokeWidth={3} />
                Tải xuống tài liệu
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Bình luận</h2>
            {doc.comments.length === 0 ? (
              <p className="text-gray-500 italic">
                Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
              </p>
            ) : (
              <div>
                {/* {doc.comments.map(comment => <div key={comment.id}>...</div>)} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;

// TODO: Build comment form
// TODO: Build comment server action
// TODO: Find solution with word file, convert to pdf while uploading
// TODO: Fix avt header style

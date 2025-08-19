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
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <Link
            href={"/dashboard"}
            rel="noopener noreferrer"
            className="group text-secondary hover:text-primary flex items-center text-sm font-medium transition"
          >
            <MoveLeft className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-[-2px]" />
            Quay về trang chủ
          </Link>
        </div>

        {/* Main Content Flex Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Left side: Info */}
          <div className="w-full border-b border-gray-200 p-6 lg:w-1/3 lg:border-r lg:border-b-0">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
              {doc.title}
            </h1>

            <div className="mb-6 flex flex-col gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User size={18} />
                <span className="font-semibold">{doc.users.name}</span>
              </div>
              <span>Đã đăng vào {generateDateString(doc.created_at)}</span>
            </div>

            {doc?.desc && (
              <div className="mb-8">
                <h2 className="mb-2 text-lg font-bold text-gray-800">
                  Mô tả tài liệu
                </h2>
                <p className="leading-relaxed text-gray-600">{doc.desc}</p>
              </div>
            )}

            <Link
              href={doc.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              <Download size={22} strokeWidth={2.5} />
              Tải xuống tài liệu
            </Link>
          </div>

          {/* Right side: PDF Preview */}
          <div className="w-full bg-gray-50 p-6 lg:w-2/3">
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <PDFViewer
                file={`/api/proxy?url=${encodeURIComponent(doc.file_url)}`}
              />
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="border-t border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Bình luận</h2>

          {/* Comment form */}
          <form
            action={"PLACEHOLDER_COMMENT_ACTION"} // TODO: thay bằng server action thật
            className="mb-6"
          >
            <textarea
              name="comment"
              rows={3}
              placeholder="Nhập bình luận của bạn..."
              className="focus:border-primary focus:ring-primary/30 w-full resize-none rounded-xl border border-gray-300 p-3 text-sm text-gray-700 shadow-sm focus:ring-2 focus:outline-none"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="bg-primary rounded-xl px-5 py-2 font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Gửi bình luận
              </button>
            </div>
          </form>

          {/* Render comments */}
          {doc.comments.length === 0 ? (
            <p className="text-gray-500 italic">
              Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
            </p>
          ) : (
            <div className="space-y-4">
              {doc.comments.map((c, idx) => (
                <div key={idx} className="rounded-xl bg-gray-50 p-4 shadow-sm">
                  <p className="text-sm text-gray-700">{c.content}</p>
                  <span className="mt-1 block text-xs text-gray-400">
                    — {c.user?.name ?? "Người dùng ẩn danh"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;

// TODO: Build comment server action
// TODO: Find solution with word file, convert to pdf while uploading
// TODO: Fix avt header style

"use client";

import { generateDateString } from "@/utils/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MoveLeft, User, Download, Star } from "lucide-react";
import PDFViewer from "components/PDFViewer";
import CommentSection from "components/CommentSection";
import TitleSkeleton from "components/skeletons/TitleSkeleton";

const DocumentDetail = ({ docId, userId, doc }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleLike = async () => {
    await fetch("/api/document/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, docId }),
    });
    setIsLiked((prev) => !prev);
  };

  const handleDownload = async () => {
    await fetch("/api/document/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, docId }),
    });
    window.open(doc.file_url, "_blank");
  };

  useEffect(() => {
    fetch("/api/document/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, docId }),
    }).catch(console.warn);
  }, [userId, docId]);

  useEffect(() => {
    const fetchLiked = async () => {
      const res = await fetch("/api/document/liked-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, docId }),
      });
      const data = await res.json();
      setIsLiked(data.liked);
      setIsLoading(false);
    };
    fetchLiked();
  }, [userId, docId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <Link
            href={"/home"}
            rel="noopener noreferrer"
            className="group text-secondary hover:text-primary flex items-center text-sm font-medium transition"
          >
            <MoveLeft className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-[-2px]" />
            Quay về trang chủ
          </Link>
        </div>

        {/* Main */}
        <div className="flex flex-col lg:flex-row">
          {isLoading ? (
            <TitleSkeleton />
          ) : (
            <div className="w-full border-b border-gray-200 p-6 lg:w-1/3 lg:border-r lg:border-b-0">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-gray-900">
                  {doc.title}
                </h1>
                <Star
                  size={30}
                  strokeWidth={1.5}
                  style={{ color: "var(--color-primary)" }}
                  onClick={toggleLike}
                  fill={isLiked ? "var(--color-primary)" : "white"}
                  className="cursor-pointer"
                />
              </div>
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
              <button
                onClick={handleDownload}
                className="bg-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
              >
                <Download size={22} strokeWidth={2.5} />
                Tải xuống tài liệu
              </button>
            </div>
          )}
          <div className="w-full bg-gray-50 p-6 lg:w-2/3">
            <div className="border-primary overflow-hidden rounded-xl border-2 bg-white shadow-lg">
              <PDFViewer
                file={`/api/proxy?url=${encodeURIComponent(doc.file_url)}`}
              />
            </div>
          </div>
        </div>
        <CommentSection docId={doc.id} userId={userId} />
      </div>
    </div>
  );
};

export default DocumentDetail;

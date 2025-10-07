"use client";

import { getLikedState, likeDocument, viewedDocument } from "@/lib/action";
import { generateDateString } from "@/utils/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MoveLeft, User, Download, Star } from "lucide-react";
import PDFViewer from "components/PDFViewer";
import CommentSection from "./CommentSection";
import TitleSkeleton from "components/skeletons/TitleSkeleton";

const DocumentDetail = ({ docId, userId, doc }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleLike = async () => {
    await likeDocument(userId, docId);
    setIsLiked((prev) => !prev);
  };

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

  useEffect(() => {
    const getState = async () => {
      const response = await getLikedState(userId, docId);
      if (response) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }

      setIsLoading(false);
    };

    getState();
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
                  style={{
                    color: "var(--color-primary)",
                  }}
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
          )}

          {/* Right side: PDF Preview */}
          <div className="w-full bg-gray-50 p-6 lg:w-2/3">
            <div className="border-primary overflow-hidden rounded-xl border-2 bg-white shadow-lg">
              <PDFViewer
                file={`/api/proxy?url=${encodeURIComponent(doc.file_url)}`}
              />
            </div>
          </div>
        </div>
        {/* Comments */}
        <CommentSection docId={doc.id} userId={doc?.users.id} />
      </div>
    </div>
  );
};

export default DocumentDetail;

// TODO: add oauth

// TODO: build profile section

// TODO: build in-site crop image

// TODO: build donate api

// **: Build group chat section, video call etc...

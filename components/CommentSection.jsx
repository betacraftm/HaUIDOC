"use client";

import { getComments } from "@/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import CommentSkeleton from "components/skeletons/CommentSkeleton";

const CommentSection = ({ docId, userId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const result = await getComments(docId);
        setComments(result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  const commentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ docId, userId, comment }),
      });
      const data = await response.json();
      setComments([data, ...comments]);
      setComment("");
    } catch (error) {}
  };

  const displayTime = (timeStamp) => {
    const createdAt = new Date(timeStamp);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - createdAt.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return `${diffInSeconds} giây trước`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      return `${diffInDays} ngày trước`;
    }
  };

  return (
    <div className="border-t border-gray-200 p-6">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Bình luận</h2>

      {/* Comment form */}
      <form onSubmit={commentSubmit} className="mb-6">
        <input
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Nhập bình luận của bạn..."
          className="focus:border-primary focus:ring-primary/30 w-full resize-none rounded-xl border border-gray-300 p-3 text-sm text-gray-700 shadow-sm focus:ring-2 focus:outline-none"
        />
        <div className="mt-3 flex justify-end">
          <button
            disabled={!comment}
            type="submit"
            className="bg-primary disabled:bg-primary/70 disabled: rounded-xl px-5 py-2 font-semibold text-white shadow-md transition hover:opacity-90 disabled:text-gray-100"
          >
            Gửi bình luận
          </button>
        </div>
      </form>

      {/* Render comments */}
      {isLoading ? (
        <CommentSkeleton />
      ) : comments.length === 0 ? (
        <p className="text-gray-500 italic">
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((c, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 rounded-xl bg-gray-50 p-4 shadow-sm sm:flex-row sm:gap-5"
            >
              <div className="shrink-0">
                <Image
                  src={c?.users.image_url || "/user.png"} // ?.users.image_url
                  alt="User avt"
                  height={40}
                  width={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-primary my-1 flex flex-col gap-1 text-sm font-extrabold sm:mt-0 sm:flex-row sm:gap-2">
                  <span>{c?.users?.name}</span>
                  <span className="text-secondary text-xs sm:text-sm">
                    {displayTime(c?.created_at)}
                  </span>
                </div>
                <p className="overflow-hidden text-sm break-words text-gray-700">
                  {c.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;

"use client";

import { getComments } from "@/lib/data";
import { useEffect, useState } from "react";

const CommentSection = ({ docId, userId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const result = await getComments(docId);
        setComments(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
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
      console.log(data);
    } catch (error) {
      console.log(error);
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
      {comments.length === 0 ? (
        <p className="text-gray-500 italic">
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((c, idx) => (
            <div key={idx} className="rounded-xl bg-gray-50 p-4 shadow-sm">
              <p className="text-sm text-gray-700">{c.content}</p>
              <span className="mt-1 block text-xs text-gray-400">
                — {c?.users?.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;

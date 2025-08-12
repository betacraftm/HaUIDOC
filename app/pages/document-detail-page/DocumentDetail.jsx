"use client";

import { viewedDocument } from "@/lib/action";
import { useEffect } from "react";

const DocumentDetail = ({ docId, userId }) => {
  useEffect(() => {
    const updateView = async () => {
      await viewedDocument(userId, docId);
    };

    updateView();
  }, []);
  return <div>DocumentDetail</div>;
};

export default DocumentDetail;

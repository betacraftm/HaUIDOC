"use client";

import { getDocuments } from "@/lib/data";
import { useEffect, useState } from "react";

const DocumentsPage = ({ section, page, userId }) => {
  const [documents, setDocuments] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { documents, total } = await getDocuments(section, page, userId);
      setDocuments(documents);
      setTotal(total);
      setIsLoading(false);
    };
    fetchData();
  }, [section, page, userId]);

  return <div>test</div>;
};

export default DocumentsPage;

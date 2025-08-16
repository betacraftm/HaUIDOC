"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import PdfSkeleton from "./PdfSkeleton";

// Cấu hình worker của PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PDFViewerClient({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(800);
  const containerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Resize để luôn fit width
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="border-primary mb-6 max-h-screen w-full overflow-y-auto rounded-lg border shadow-lg"
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<PdfSkeleton />}
      >
        {numPages ? (
          Array.from({ length: numPages }, (_, index) => (
            <div key={`page_${index + 1}`} className="flex justify-center">
              <Page
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={width - 32}
              />
              {index + 1 < numPages && (
                <div className="my-8 w-full border-b border-gray-300" />
              )}
            </div>
          ))
        ) : (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
          </div>
        )}
      </Document>
    </div>
  );
}

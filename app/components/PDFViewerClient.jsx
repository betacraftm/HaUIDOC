"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import PdfSkeleton from "./skeletons/PdfSkeleton";

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
    <div ref={containerRef} className="max-h-screen w-full overflow-y-auto">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<PdfSkeleton />}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <div key={`page_${index + 1}`} className="flex justify-center">
            <Page
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={width - 32}
            />
            {index + 1 < numPages && <div className="my-8 w-full" />}
          </div>
        ))}
      </Document>
    </div>
  );
}

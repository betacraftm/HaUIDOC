"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PdfSkeleton from "./skeletons/PdfSkeleton";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewerClient({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(800);
  const containerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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

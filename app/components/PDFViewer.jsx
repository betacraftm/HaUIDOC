"use client";
import dynamic from "next/dynamic";
import PdfSkeleton from "./PdfSkeleton";

const PDFViewerClient = dynamic(() => import("./PDFViewerClient"), {
  ssr: false,
  loading: () => <PdfSkeleton border={"border border-primary"} />,
});

export default function PDFViewer({ file }) {
  return <PDFViewerClient file={file} />;
}

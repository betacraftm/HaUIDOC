"use client";
import dynamic from "next/dynamic";
import PdfSkeleton from "./skeletons/PdfSkeleton";

const PDFViewerClient = dynamic(() => import("./PDFViewerClient"), {
  ssr: false,
  loading: () => <PdfSkeleton />,
});

export default function PDFViewer({ file }) {
  return <PDFViewerClient file={file} />;
}

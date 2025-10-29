/**
 * PDF Viewer Component (Wrapper)
 *
 * A dynamic wrapper component for PDF viewing functionality. This component uses Next.js
 * dynamic imports to load the PDF viewer only on the client side, avoiding SSR issues
 * with PDF.js and providing better performance.
 *
 * Features:
 * - Client-side only rendering to avoid SSR conflicts
 * - Lazy loading with skeleton placeholder
 * - Error boundaries for PDF loading failures
 * - Responsive design that fits container width
 *
 * Why Dynamic Import:
 * - PDF.js requires browser APIs not available during SSR
 * - Reduces initial bundle size by code splitting
 * - Improves page load performance
 *
 * @component
 * @param {Object} props
 * @param {string} props.file - URL or blob of the PDF file to display
 */

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

export default function PdfSkeleton() {
  return (
    <div
      className={`flex h-[600px] w-full animate-pulse flex-col gap-3 rounded-lg bg-gray-50 p-4`}
    >
      <div className="h-6 w-1/3 rounded-lg bg-gray-300"></div>
      <div className="h-4 w-2/3 rounded-lg bg-gray-300"></div>
      <div className="h-full rounded-lg bg-gray-300"></div>
    </div>
  );
}

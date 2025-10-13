const DocumentSkeleton = () => {
  return (
    <div className="mb-4 w-full animate-pulse rounded-xl bg-gray-50 p-4 shadow-sm">
      {/* Title + Button */}
      <div className="flex flex-col px-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0 sm:w-2/3">
          <div className="h-6 w-3/4 rounded-xl bg-gray-300"></div>
          <div className="mt-2 h-6 w-1/2 rounded-xl bg-gray-300"></div>
        </div>

        <div className="mt-2 hidden sm:mt-0 sm:block">
          <div className="h-10 w-30 rounded-xl bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default DocumentSkeleton;

const TitleSkeleton = () => {
  return (
    <div className="w-full animate-pulse border-b border-gray-200 bg-gray-50 p-6 lg:w-1/3 lg:border-r lg:border-b-0">
      <div className="mb-4 h-8 w-full rounded-lg bg-gray-300"></div>

      <div className="mb-6 flex flex-col gap-2">
        <div className="h-6 w-1/3 rounded-lg bg-gray-300"></div>
        <div className="h-6 w-1/2 rounded-lg bg-gray-300"></div>
      </div>

      <div className="mb-8 flex flex-col gap-2">
        <div className="h-7 w-1/3 rounded-lg bg-gray-300"></div>
        <div className="h-36 w-full rounded-lg bg-gray-300"></div>
      </div>

      <div className="inline-block h-10 w-2/3 rounded-lg bg-gray-300 sm:w-1/3 lg:w-2/3"></div>
    </div>
  );
};

export default TitleSkeleton;

const CommentSkeleton = () => {
  return (
    <div className="w-full rounded-xl bg-gray-50 p-4 shadow-sm">
      <div className="flex animate-pulse flex-col space-x-4 sm:flex-row">
        <div className="size-10 rounded-full bg-gray-300"></div>
        <div className="my-1 flex-1 space-y-6 py-1 sm:mt-0">
          <div className="h-2 rounded bg-gray-300"></div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-gray-300"></div>
              <div className="col-span-1 h-2 rounded bg-gray-300"></div>
            </div>
            <div className="h-2 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;

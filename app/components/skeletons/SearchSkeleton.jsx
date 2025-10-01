import DocumentSkeleton from "./DocumentSkeleton";

const SearchSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 7 }).map((_, idx) => {
        return <DocumentSkeleton key={idx} />;
      })}
    </div>
  );
};

export default SearchSkeleton;

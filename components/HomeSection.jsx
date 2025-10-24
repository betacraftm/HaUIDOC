import DocumentCard from "components/DocumentCard";
import Link from "next/link";

const HomeSection = ({ title, data = [], viewAllString, metaData, href }) => {
  return (
    <section className="mb-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">{title}</h2>
      {data.length != 0 ? (
        <div className="hide-scrollbar grid grid-cols-1 overflow-x-auto">
          {data.map((doc) => (
            <div key={doc.id}>
              <DocumentCard
                title={doc.title}
                subject={doc?.subjects.name}
                linkUrl={`/documents/${doc.id}`}
                metaData={metaData}
                doc={doc}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Chưa có tài liệu nào</p>
      )}

      {data.length >= 5 && (
        <div className="mt-8 text-center">
          <Link
            href={href}
            className="text-primary font-semibold hover:underline"
          >
            {viewAllString} &rarr;
          </Link>
        </div>
      )}
    </section>
  );
};

export default HomeSection;

import DocumentCard from "@/ui/DocumentCard";
import Link from "next/link";

const DashBoardSection = ({ title, data = [], viewAllString }) => {
  return (
    <section className="mb-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">{title}</h2>
      {data.length != 0 ? (
        <div className="hide-scrollbar flex gap-6 overflow-x-auto">
          {data.map((doc) => (
            <div key={doc.id} className="flex-none">
              <DocumentCard
                title={doc.title}
                description={doc.description}
                type={doc.type}
                imageUrl={doc.imageUrl}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Chưa có tài liệu nào</p>
      )}

      {data.length > 6 && (
        <div className="mt-8 text-center">
          <Link
            href="/latest-documents"
            className="text-primary font-semibold hover:underline"
          >
            {viewAllString} &rarr;
          </Link>
        </div>
      )}
    </section>
  );
};

export default DashBoardSection;

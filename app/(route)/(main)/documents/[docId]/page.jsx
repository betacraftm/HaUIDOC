import { getSession } from "@/lib/getSession";
import { checkDocumentExcist, getDocumentById } from "@/lib/data";
import DocumentDetail from "components/DocumentDetail";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
const { docId } = await params;

try {
const docExcist = await checkDocumentExcist(docId);
  if (!docExcist) {
    return {
      title: "Tài liệu không tồn tại - HaUIDOC",
    };
    }

    const doc = await getDocumentById(docId);

    return {
      title: `${doc.title} - HaUIDOC`,
      description: doc.desc
        ? `${doc.desc.substring(0, 155)}...`
        : `Tài liệu học tập: ${doc.title}. Tải xuống miễn phí từ HaUIDOC - nền tảng chia sẻ tài liệu Đại học Công nghiệp Hà Nội.`,
      keywords: `${doc.title}, tài liệu học tập, PDF, HaUI, Đại học Công nghiệp Hà Nội, ${doc.subjects?.name || ''}`,
      openGraph: {
        title: `${doc.title} - HaUIDOC`,
        description: doc.desc || `Tài liệu học tập từ HaUIDOC - Đại học Công nghiệp Hà Nội`,
        url: `/documents/${docId}`,
        type: "article",
        authors: [doc.users?.name || "HaUIDOC"],
        publishedTime: doc.created_at,
      },
      twitter: {
        card: "summary",
        title: `${doc.title} - HaUIDOC`,
        description: doc.desc?.substring(0, 200) || `Tài liệu học tập từ HaUIDOC`,
      },
    };
  } catch (error) {
    return {
      title: "Tài liệu - HaUIDOC",
      description: "Xem tài liệu học tập từ HaUIDOC - nền tảng chia sẻ tài liệu Đại học Công nghiệp Hà Nội",
    };
  }
}

const page = async ({ params }) => {
  const { docId } = await params;
  const docExcist = await checkDocumentExcist(docId);
  if (!docExcist) {
    notFound();
  }
  const { user } = await getSession();
  const userId = user.id;
  const doc = await getDocumentById(docId);

  return <DocumentDetail docId={docId} userId={userId} doc={doc} />;
};

export default page;

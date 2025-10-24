import CompletePage from "components/page-components/CompletePage";
import { getDocumentById } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { docId } = await params;

  try {
    const doc = await getDocumentById(docId);
    return {
      title: `Tải lên thành công: ${doc.title} - HaUIDOC`,
      description: `Tài liệu "${doc.title}" đã được tải lên thành công. Chia sẻ với cộng đồng sinh viên Đại học Công nghiệp Hà Nội.`,
    };
  } catch (error) {
    return {
      title: "Tải lên thành công - HaUIDOC",
      description: "Tài liệu của bạn đã được tải lên thành công và đang chờ kiểm duyệt.",
    };
  }
}

const page = async ({ params }) => {
  const { docId } = await params;

  return <CompletePage docId={docId} />;
};

export default page;

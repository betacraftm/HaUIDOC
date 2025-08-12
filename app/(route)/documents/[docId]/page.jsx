import { getUserAuth } from "@/lib/auth";
import { checkDocumentExcist } from "@/lib/data";
import DocumentDetail from "@/pages/document-detail-page/DocumentDetail";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  const { docId } = await params;
  const docExcist = await checkDocumentExcist(docId);
  if (!docExcist) {
    notFound();
  }

  const { user } = await getUserAuth();
  const userId = user.id;

  return <DocumentDetail docId={docId} userId={userId} />;
};

export default page;

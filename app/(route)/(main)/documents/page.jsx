import { getSession } from "@/lib/auth";
import { getDocuments } from "@/lib/data";
import DocumentsPage from "pages/documents-page";

const page = async ({ searchParams }) => {
  const query = await searchParams;
  const section = query.section || "recently";
  const page = query.page || 1;
  const userId = (await getSession()).id;

  return <DocumentsPage section={section} page={page} userId={userId} />;
};

export default page;

import { viewedDocument } from "@/lib/action";
import { getUserAuth } from "@/lib/auth";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  const { user } = await getUserAuth();
  const userId = user.id;
  const { docId } = await params;

  const doc = await viewedDocument(userId, docId);
  if (doc === null) {
    notFound();
  }

  return <div>{docId}</div>;
};

export default page;

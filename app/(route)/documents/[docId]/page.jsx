import { viewedDocument } from "@/lib/action";
import { getUserAuth } from "@/lib/auth";
import { getUserById } from "@/lib/data";

const page = async ({ params }) => {
  const { user } = await getUserAuth();
  const userId = user.id;
  const { docId } = await params;

  await viewedDocument(userId, docId);

  return <div>{docId}</div>;
};

export default page;

//* Build a server action to get document also update the viewed recently table in database

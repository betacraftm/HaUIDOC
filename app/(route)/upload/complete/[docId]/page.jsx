import CompletePage from "@/pages/upload-page/complete-page";

const page = async ({ params }) => {
  const { docId } = await params;

  return <CompletePage docId={docId} />;
};

export default page;

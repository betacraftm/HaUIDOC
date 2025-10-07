import { fetchSubjects } from "@/lib/data";
import UploadPage from "pages/upload-page";

const page = async () => {
  const subjectsList = await fetchSubjects();

  return <UploadPage subjectsList={subjectsList} />;
};

export default page;

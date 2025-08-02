import UploadPage from "@/pages/upload-page/Index";
import { fetchSubjects } from "@/lib/data";

const page = async () => {
  const subjectsList = await fetchSubjects();

  return <UploadPage subjectsList={subjectsList} />;
};

export default page;

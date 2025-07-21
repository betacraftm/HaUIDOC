import RegisterPage from "@/pages/registerpage/RegisterPage";
import { fetchMajors } from "@/lib/data";

const Page = async () => {
  const majorsList = await fetchMajors();

  return <RegisterPage majorsList={majorsList} />;
};

export default Page;

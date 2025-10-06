import RegisterPage from "@/pages/register-page";
import { fetchMajors } from "@/lib/data";

const Page = async () => {
  const majorsList = await fetchMajors();

  return <RegisterPage majorsList={majorsList} />;
};

export default Page;

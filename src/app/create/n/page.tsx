import { CreateNovelForm } from "@/components/CreateNovelForm";
import { getAuthSession } from "@/lib/auth";

const Page = async () => {
  const session = await getAuthSession();

  return <CreateNovelForm />;
};

export default Page;

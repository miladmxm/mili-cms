import { redirect } from "next/navigation";

import type { SearchParams } from "@/types/type";

import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import EditPortfolioForm from "../components/editPortfolioForm";
import { getPortfolio } from "../dal/query";

const EditPortfolio = async ({
  searchParams,
  id,
}: {
  searchParams?: SearchParams;
  id: string;
}) => {
  const portfolio = await getPortfolio(id);
  if (!portfolio) redirect("/admin/portfolio");
  const images = getMediasByType(["image"], searchParams);
  return (
    <MediaContextProvider media={{ image: images }}>
      <EditPortfolioForm portfolio={portfolio} />
    </MediaContextProvider>
  );
};

export default EditPortfolio;

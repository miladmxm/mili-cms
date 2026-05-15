import type { SearchParams } from "@/types/type";

import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import CreatePortfolioForm from "../components/createPortfolioForm";

const CreatePortfolio = ({ searchParams }: { searchParams?: SearchParams }) => {
  const images = getMediasByType(["image"], searchParams);
  return (
    <MediaContextProvider media={{ image: images }}>
      <CreatePortfolioForm />
    </MediaContextProvider>
  );
};

export default CreatePortfolio;

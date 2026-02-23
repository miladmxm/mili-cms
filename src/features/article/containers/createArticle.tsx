import type { SearchParams } from "@/types/type";

import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import CreateArticleForm from "../components/createArticleForm";
import { getCategories } from "../dal/query";

const CreateArticle = ({ searchParams }: { searchParams?: SearchParams }) => {
  const images = getMediasByType(["image"], searchParams);
  const audios = getMediasByType(["audio"], searchParams);
  const categories = getCategories();
  return (
    <MediaContextProvider media={{ image: images, audio: audios }}>
      <CreateArticleForm categories={categories} />;
    </MediaContextProvider>
  );
};

export default CreateArticle;

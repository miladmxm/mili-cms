import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import CreateArticleForm from "../components/createArticleForm";
import { getCategories } from "../dal/query";

const CreateArticle = () => {
  const images = getMediasByType(["image"]);
  const audios = getMediasByType(["audio"]);
  const categories = getCategories();
  return (
    <MediaContextProvider media={{ image: images, audio: audios }}>
      <CreateArticleForm categories={categories} />;
    </MediaContextProvider>
  );
};

export default CreateArticle;

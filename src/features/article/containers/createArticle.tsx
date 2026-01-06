import { getMediasByType } from "@/features/media/dal/queries";

import CreateArticleForm from "../components/createArticleForm";
import { getCategories } from "../dal/query";

const CreateArticle = () => {
  const medias = getMediasByType(["image"]);
  const categories = getCategories();
  return <CreateArticleForm medias={medias} categories={categories} />;
};

export default CreateArticle;

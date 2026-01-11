import { getMediasByType } from "@/features/media/dal/queries";

import EditArticleForm from "../components/editArticleForm";
import { getCategories } from "../dal/query";

const EditArticle = async ({ id }: { id: string }) => {
  console.log(id);
  const medias = getMediasByType(["image"]);
  const categories = getCategories();

  return <EditArticleForm medias={medias} categories={categories} />;
};

export default EditArticle;

import { dalVerifySuccess } from "@/dal/helpers";
import { getMediasByType } from "@/features/media/dal/queries";

import { getArticle, getCategories } from "../dal/query";

const EditArticle = async ({ id }: { id: string }) => {
  const medias = getMediasByType(["image"]);
  const categories = getCategories();

  const article = dalVerifySuccess(await getArticle(id));
  return <div>{article?.title}</div>;
};

export default EditArticle;

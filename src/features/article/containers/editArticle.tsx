import { redirect } from "next/navigation";

import { dalVerifySuccess } from "@/dal/helpers";
import { getMediasByType } from "@/features/media/dal/queries";

import EditArticleForm from "../components/editArticleForm";
import { getArticle, getCategories } from "../dal/query";

const EditArticle = async ({ id }: { id: string }) => {
  const article = dalVerifySuccess(await getArticle(id));
  if (!article) redirect("/admin");
  const medias = getMediasByType(["image"]);
  const categories = getCategories();

  return (
    <EditArticleForm
      article={article}
      medias={medias}
      categories={categories}
    />
  );
};

export default EditArticle;

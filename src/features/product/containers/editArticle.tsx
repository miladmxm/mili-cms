import { redirect } from "next/navigation";

import { dalVerifySuccess } from "@/dal/helpers";
import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import EditArticleForm from "../components/editArticleForm";
import { getArticle, getCategories } from "../dal/query";

const EditArticle = async ({ id }: { id: string }) => {
  const article = dalVerifySuccess(await getArticle(id));
  if (!article) redirect("/admin");
  const images = getMediasByType(["image"]);
  const audios = getMediasByType(["audio"]);
  const categories = getCategories();

  return (
    <MediaContextProvider media={{ image: images, audio: audios }}>
      <EditArticleForm article={article} categories={categories} />
    </MediaContextProvider>
  );
};

export default EditArticle;

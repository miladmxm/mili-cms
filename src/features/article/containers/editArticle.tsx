import { redirect } from "next/navigation";

import type { SearchParams } from "@/types/type";

import { dalVerifySuccess } from "@/dal/helpers";
import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import EditArticleForm from "../components/editArticleForm";
import { getArticle, getCategories } from "../dal/query";

const EditArticle = async ({
  id,
  searchParams,
}: {
  id: string;
  searchParams?: SearchParams;
}) => {
  const article = dalVerifySuccess(await getArticle(id));
  if (!article) redirect("/admin");
  const images = getMediasByType(["image"], searchParams);
  const audios = getMediasByType(["audio"], searchParams);
  const categories = getCategories();

  return (
    <MediaContextProvider media={{ image: images, audio: audios }}>
      <EditArticleForm article={article} categories={categories} />
    </MediaContextProvider>
  );
};

export default EditArticle;

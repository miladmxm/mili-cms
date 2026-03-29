import { redirect } from "next/navigation";

import { dalVerifySuccess } from "@/dal/helpers";
import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import EditProductForm from "../components/editProductForm";
import { getCategories, getProduct } from "../dal/query";

const EditArticle = async ({ id }: { id: string }) => {
  const product = dalVerifySuccess(await getProduct(id));
  if (!product) redirect("/admin");
  const images = getMediasByType(["image"]);
  const audios = getMediasByType(["audio"]);
  const categories = getCategories();

  return (
    <MediaContextProvider media={{ image: images, audio: audios }}>
      <EditProductForm categories={categories} product={product} />
    </MediaContextProvider>
  );
};

export default EditArticle;

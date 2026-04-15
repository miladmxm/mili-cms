import { redirect } from "next/navigation";

import { dalVerifySuccess } from "@/dal/helpers";
import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import EditProductForm from "../components/editProductForm";
import EditProductContextProvider from "../context/editProduct";
import { getCategories, getOptions, getProduct } from "../dal/query";

const EditProduct = async ({ id }: { id: string }) => {
  const product = dalVerifySuccess(await getProduct(id));
  if (!product) redirect("/admin/products");
  const images = getMediasByType(["image"]);
  const audios = getMediasByType(["audio"]);
  const categories = getCategories();
  const options = getOptions();
  return (
    <MediaContextProvider media={{ image: images, audio: audios }}>
      <EditProductContextProvider product={product}>
        <EditProductForm categories={categories} options={options} />
      </EditProductContextProvider>
    </MediaContextProvider>
  );
};

export default EditProduct;

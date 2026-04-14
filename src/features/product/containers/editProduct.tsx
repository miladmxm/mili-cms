import { redirect } from "next/navigation";

import { dalVerifySuccess } from "@/dal/helpers";
import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import EditProductForm from "../components/editProductForm";
import { getCategories, getOptions, getProduct } from "../dal/query";

const EditProduct = async ({ id }: { id: string }) => {
  const product = dalVerifySuccess(await getProduct(id));
  if (!product) redirect("/admin");
  const images = getMediasByType(["image"]);
  const audios = getMediasByType(["audio"]);
  const categories = getCategories();
  const options = getOptions();
  console.log(product);
  return (
    <MediaContextProvider media={{ image: images, audio: audios }}>
      <EditProductForm
        categories={categories}
        options={options}
        product={product}
      />
    </MediaContextProvider>
  );
};

export default EditProduct;

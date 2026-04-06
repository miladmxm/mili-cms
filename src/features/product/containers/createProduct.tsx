import type { SearchParams } from "@/types/type";

import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import CreateProductForm from "../components/createProductForm";
import { getCategories, getOptions } from "../dal/query";

const CreateProduct = ({ searchParams }: { searchParams?: SearchParams }) => {
  const images = getMediasByType(["image"], searchParams);
  const audios = getMediasByType(["audio"], searchParams);
  const options = getOptions();
  const categories = getCategories();
  return (
    <MediaContextProvider media={{ image: images, audio: audios }}>
      <CreateProductForm categories={categories} options={options} />
    </MediaContextProvider>
  );
};

export default CreateProduct;

import type { SearchParams } from "@/types/type";

import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import AllCategories from "../components/categories/allCategories";
import { getCategories } from "../dal/query";

const Categories = async ({
  editCategoryId,
  searchParams,
}: {
  editCategoryId?: string;
  searchParams?: SearchParams;
}) => {
  const categories = await getCategories();
  const imageMedia = getMediasByType(["image"], searchParams);
  return (
    <MediaContextProvider media={{ image: imageMedia }}>
      <AllCategories categories={categories} editCategoryId={editCategoryId} />
    </MediaContextProvider>
  );
};

export default Categories;

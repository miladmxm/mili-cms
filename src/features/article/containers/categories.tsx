import MediaContextProvider from "@/features/media/context";
import { getMediasByType } from "@/features/media/dal/queries";

import AllCategories from "../components/categories/allCategories";
import { getCategories } from "../dal/query";

const Categories = async ({ editCategoryId }: { editCategoryId?: string }) => {
  const categories = await getCategories();
  const imageMedia = getMediasByType(["image"]);
  return (
    <MediaContextProvider media={{ image: imageMedia }}>
      <AllCategories categories={categories} editCategoryId={editCategoryId} />
    </MediaContextProvider>
  );
};

export default Categories;

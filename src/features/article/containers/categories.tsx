import { getMediasByType } from "@/features/media/dal/queries";

import AllCategories from "../components/categories/allCategories";
import { getCategories } from "../dal/query";

const Categories = async ({ editCategoryId }: { editCategoryId?: string }) => {
  const categories = await getCategories();
  const media = getMediasByType(["image"]);
  return (
    <AllCategories
      media={media}
      categories={categories}
      editCategoryId={editCategoryId}
    />
  );
};

export default Categories;

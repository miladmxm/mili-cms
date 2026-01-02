import { getMediasByType } from "@/features/media/dal/queries";

import CreateCategory from "../components/createCategory";
import { getCategories } from "../dal/query";

const Categories = async () => {
  const categories = await getCategories();
  const medias = getMediasByType(["image"]);
  return (
    <div className="grid grid-cols-1 auto-rows-auto lg:grid-cols-8">
      <CreateCategory
        className="md:col-span-3"
        medias={medias}
        categories={categories}
      />
    </div>
  );
};

export default Categories;

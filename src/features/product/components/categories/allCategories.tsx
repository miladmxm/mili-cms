import { cn } from "@/lib/utils";

import type { Category } from "../../../../services/article/types";

import { buildCategoryTree } from "../../utils/buildCategoryTree";
import CategoryList from "./categoryList";
import CreateCategory from "./createCategory";
import EditCategory from "./editCategory";

const AllCategories = ({
  categories,
  className,
  editCategoryId,
}: {
  categories: Category[];
  className?: string;
  editCategoryId?: string;
}) => {
  const categoriesTree = buildCategoryTree(categories);
  const editableCategory = categories.find(({ id }) => id === editCategoryId);
  return (
    <div className="grid grid-cols-1 auto-rows-auto lg:grid-cols-8">
      {editableCategory ? (
        <EditCategory
          className="md:col-span-3"
          key={editableCategory.updatedAt.toString()}
          categories={categories}
          editCategory={editableCategory}
        />
      ) : (
        <CreateCategory className="md:col-span-3" categories={categories} />
      )}
      <div
        className={cn(
          "md:ps-4 md:col-span-5 flex flex-col gap-4 pt-5 w-full",
          className,
        )}
      >
        <CategoryList treeCategories={categoriesTree} />
      </div>
    </div>
  );
};

export default AllCategories;

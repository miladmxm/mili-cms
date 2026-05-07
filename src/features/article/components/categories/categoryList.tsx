import type { CategoryTree } from "@/services/article/types";

import CategoryItem from "./categoryItem";

const CategoryList = ({
  treeCategories,
}: {
  treeCategories: CategoryTree[];
}) => {
  return (
    <div className="flex gap-4 flex-col">
      {treeCategories.map((category) => (
        <CategoryItem key={category.id} {...category}>
          {category.children && category.children.length > 0 && (
            <CategoryList treeCategories={category.children} />
          )}
        </CategoryItem>
      ))}
    </div>
  );
};

export default CategoryList;

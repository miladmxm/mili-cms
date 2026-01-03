import { ImageOff } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import type { Category, CategoryTree } from "../types";

import { buildCategoryTree } from "../utils/buildCategoryTree";
import DeleteCategory from "./deleteCategory";

const CategoryList = ({
  treeCategories,
}: {
  treeCategories: CategoryTree[];
}) => {
  return (
    <div className="flex gap-4 flex-col">
      {treeCategories.map((category) => (
        <div
          className="ps-3 border-s border-dashed flex flex-col gap-4"
          key={category.id}
        >
          <div className="bg-accent p-3 rounded-lg flex justify-between items-center ">
            <div className="flex items-center gap-3">
              {category.thumbnail?.url ? (
                <Image
                  height={32}
                  width={32}
                  alt={category.thumbnail.alt}
                  className="size-8 object-cover rounded-full"
                  src={category.thumbnail.url}
                />
              ) : (
                <div className="size-8 dark:bg-gray-900 bg-gray-200 rounded-full p-1 center text-accent-foreground/70">
                  <ImageOff />
                </div>
              )}
              <span>{category.name}</span>
            </div>
            <DeleteCategory id={category.id} />
          </div>
          {category.children && category.children.length > 0 && (
            <CategoryList treeCategories={category.children} />
          )}
        </div>
      ))}
    </div>
  );
};

const AllCategories = ({
  categories,
  className,
}: {
  categories: Category[];
  className?: string;
}) => {
  const categoriesTree = buildCategoryTree(categories);
  return (
    <div className={cn("md:ps-4 flex flex-col gap-4 pt-5 w-full", className)}>
      <CategoryList treeCategories={categoriesTree} />
    </div>
  );
};

export default AllCategories;

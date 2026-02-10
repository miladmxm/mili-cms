import { Edit2, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CategoryTree } from "@/services/article/types";

import { Button } from "@/components/dashboard/ui/button";

import DeleteCategory from "../deleteCategory";

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
            <div>
              <Button asChild size="icon-sm" variant="ghost">
                <Link href={`/admin/blog/categories/${category.id}`}>
                  <Edit2 />
                </Link>
              </Button>
              <DeleteCategory id={category.id} />
            </div>
          </div>
          {category.children && category.children.length > 0 && (
            <CategoryList treeCategories={category.children} />
          )}
        </div>
      ))}
    </div>
  );
};
export default CategoryList;

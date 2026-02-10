import type { PropsWithChildren } from "react";

import { ImageOff } from "lucide-react";
import Image from "next/image";

import type { Category } from "@/services/article/types";

import DeleteCategory from "../deleteCategory";
import LinkToEdit from "./linkToEdit";

const CategoryItem = ({
  name,
  thumbnail,
  id,
  children,
}: PropsWithChildren<Category>) => {
  return (
    <div className="ps-3 border-s border-dashed flex flex-col gap-4">
      <div className="bg-accent p-3 rounded-lg flex justify-between items-center ">
        <div className="flex items-center gap-3">
          {thumbnail?.url ? (
            <Image
              height={32}
              width={32}
              alt={thumbnail.alt}
              className="size-8 object-cover rounded-full"
              src={thumbnail.url}
            />
          ) : (
            <div className="size-8 dark:bg-gray-900 bg-gray-200 rounded-full p-1 center text-accent-foreground/70">
              <ImageOff />
            </div>
          )}
          <span>{name}</span>
        </div>
        <div>
          <LinkToEdit id={id} />
          <DeleteCategory id={id} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default CategoryItem;

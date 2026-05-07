import type { PropsWithChildren } from "react";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Category } from "@/services/article/types";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/dashboard/ui/item";

import DeleteCategory from "../deleteCategory";
import LinkToEdit from "./linkToEdit";

const CategoryItem = ({
  name,
  thumbnail,
  id,
  slug,
  children,
}: PropsWithChildren<Category>) => {
  return (
    <div className="ps-3 border-s border-dashed flex flex-col gap-4">
      <Item className="bg-accent/40 p-3 rounded-lg flex justify-between items-center ">
        <ItemMedia>
          {thumbnail?.url ? (
            <Image
              height={32}
              width={32}
              alt={thumbnail.alt}
              className="size-10 object-contain ring-2 ring-border p-1 rounded-full"
              src={thumbnail.url}
            />
          ) : (
            <div className="size-10 ring-2 ring-border dark:bg-gray-900 bg-gray-200 rounded-full p-1 center text-accent-foreground/70">
              <ImageOff />
            </div>
          )}
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription>
            <Link className="" href="/" target="_blank">
              {slug}
            </Link>
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <LinkToEdit id={id} />
          <DeleteCategory id={id} />
        </ItemActions>
      </Item>
      {children}
    </div>
  );
};

export default CategoryItem;

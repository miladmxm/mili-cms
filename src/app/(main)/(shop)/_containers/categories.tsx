"use client";

import type { PropsWithChildren } from "react";

import Link, { useLinkStatus } from "next/link";

import type { Category } from "@/services/product/type";

import SeparatorLine from "@/components/ui/separatorLine";
import { cn } from "@/lib/utils";

import { useFilterParams } from "../_context";
import { useMainLayoutContext } from "../../_context";

const CategoryLinkItemText = ({ children }: PropsWithChildren) => {
  const { pending } = useLinkStatus();
  return <span className={cn({ "animate-pulse": pending })}>{children}</span>;
};

const CategoryLinkItem = ({ name, slug }: Category) => {
  const { slug: activeSlug } = useFilterParams();
  return (
    <li>
      <Link
        className={cn(
          "text-thready-800 text-nowrap hover:text-secondary-500 transition-colors",
          {
            "text-secondary-500": activeSlug === slug,
          },
        )}
        href={`/products/${slug}`}
      >
        <CategoryLinkItemText>{name}</CategoryLinkItemText>
      </Link>
    </li>
  );
};

const CategoryLinks = () => {
  const { productCategories } = useMainLayoutContext();
  return (
    <div className="flex flex-col items-center">
      <div className="overflow-x-auto max-w-full pb-4">
        <ul className="flex gap-8 center w-fit mx-auto">
          {productCategories.map((category) => (
            <CategoryLinkItem key={category.slug} {...category} />
          ))}
        </ul>
      </div>
      <SeparatorLine size="4" />
    </div>
  );
};

export default CategoryLinks;

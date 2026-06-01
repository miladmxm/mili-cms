"use client";

import Link from "next/link";

import type { Category } from "@/services/product/type";

import SeparatorLine from "@/components/ui/separatorLine";

import { useMainLayoutContext } from "../../_context";

const CategoryLinkItem = ({ name, slug }: Category) => {
  return (
    <li>
      <Link
        className="text-thready-800 text-nowrap hover:text-secondary-500 transition-colors"
        href={`/products/${slug}`}
      >
        {name}
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

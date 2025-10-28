"use client";

import type { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { use } from "react";

import type { DalReturn } from "@/dal/types";
import type { Product } from "@/features/products/types/products";

const ProductsWrapper: FC<{
  products: Promise<
    DalReturn<
      Pick<
        Product,
        | "categories"
        | "id"
        | "images"
        | "name"
        | "prices"
        | "shortDescription"
        | "slug"
      >[]
    >
  >;
}> = ({ products }) => {
  const productsQuery = use(products);
  const router = useRouter();
  const searchParams = useSearchParams();
  if (productsQuery.success === false) return <div>Error loading posts</div>;
  const loadMore = () => {
    const search = new URLSearchParams(searchParams);
    search.set("page", ((Number(search.get("page")) || 1) + 1).toString());
    router.replace(`?${search.toString()}`, { scroll: false });
    router.refresh();
  };
  return (
    <div className="flex flex-col gap-5 w-full">
      {productsQuery.data.map((product) => (
        <div className="rounded-xl ring-2 mx-auto h-96" key={product.id}>
          {product.images && (
            <Image
              height={200}
              width={300}
              alt={product.images[0].alt}
              blurDataURL={product.images[0].thumbnail}
              src={product.images[0].src}
              placeholder="blur"
            />
          )}
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
          <div className="flex gap-2 ring-2 my-2">
            {product.categories.map((category) => (
              <Link href={`/shop/${category.slug}`} key={category.id}>
                {category.name}
              </Link>
            ))}
          </div>
          <p>{product.shortDescription}</p>
        </div>
      ))}
      <button type="button" onClick={loadMore}>
        load more
      </button>
    </div>
  );
};

export default ProductsWrapper;

import type { PropsWithChildren } from "react";

import type { SearchParams } from "@/types/type";

import ProductCard, { ProductCardSkeleton } from "@/components/ui/productCard";
import { getPublishedProducts } from "@/features/product/dal/query";
import { getPageRenderItemCounterByOffsetInSearchParams } from "@/utils/getFromSearchParams";

const ProductsContainer = ({ children }: PropsWithChildren) => {
  return (
    <section className="grid @min-2xl:grid-cols-2 @min-5xl:grid-cols-3 auto-rows-auto gap-4">
      {children}
    </section>
  );
};

export const ProductsSkeleton = () => {
  return (
    <ProductsContainer>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </ProductsContainer>
  );
};

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const limit = await getPageRenderItemCounterByOffsetInSearchParams(
    searchParams,
    3,
  );
  const products = await getPublishedProducts({
    limit,
    offset: 0,
  });
  return (
    <ProductsContainer>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ProductsContainer>
  );
};

export default Products;

import { cacheLife } from "next/cache";
import { Suspense } from "react";

import type { SearchParams } from "@/types/type";

import { getProductsByLimit } from "@/features/products/dal/queries";
import { getPageRenderItemCounterByOffsetInSearchParams } from "@/utils/getFromSearchParams";

import ProductsWrapper from "./productsWrapper";

const Shop = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  "use cache: private";
  cacheLife("hours");
  const offset =
    await getPageRenderItemCounterByOffsetInSearchParams(searchParams);
  const products = getProductsByLimit({
    offset,
    page: 1,
  });
  return <ProductsWrapper products={products} />;
};

const ShopWrapper = async ({ searchParams }: PageProps<"/shop">) => {
  const search = searchParams;
  return (
    <Suspense>
      <Shop searchParams={search} />
    </Suspense>
  );
};

export default ShopWrapper;

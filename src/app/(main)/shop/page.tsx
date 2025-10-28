import { Suspense } from "react";

import { getProductsByLimit } from "@/features/products/dal/queries";

import ProductsWrapper from "./productsWrapper";

const Shop = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const search = await searchParams;
  const page = search?.page || "1";
  const pageNumbaer = parseInt(page, 10);
  const offset = 10 * pageNumbaer;
  const products = getProductsByLimit({
    offset,
    page: 1,
  });
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ProductsWrapper products={products} />
    </Suspense>
  );
};

export default Shop;

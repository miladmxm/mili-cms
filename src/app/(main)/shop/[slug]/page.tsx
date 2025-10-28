import { Suspense } from "react";

import {
  getCategoryIdBySlug,
  getProductsByLimit,
} from "@/features/products/dal/queries";
import { getPageRenderItemCounterByOffsetInSearchParams } from "@/utils/getFromSearchParams";

import ProductsWrapper from "../productsWrapper";

const ShopCategory = async ({
  params,
  searchParams,
}: PageProps<"/shop/[slug]">) => {
  const { slug } = await params;
  const categoryId = await getCategoryIdBySlug(slug);
  if (!categoryId.success) return null;
  const offset =
    await getPageRenderItemCounterByOffsetInSearchParams(searchParams);
  const products = getProductsByLimit({
    offset,
    page: 1,
    category: String(categoryId.data.id),
  });
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ProductsWrapper products={products} />;
    </Suspense>
  );
};

export default ShopCategory;

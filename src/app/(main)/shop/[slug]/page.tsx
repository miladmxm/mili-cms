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
  "use cache";
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
  return <ProductsWrapper products={products} />;
};

const ShopCategoryCacheWrapper = ({
  searchParams,
  params,
}: PageProps<"/shop/[slug]">) => {
  return (
    <Suspense fallback="loading">
      <ShopCategory params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default ShopCategoryCacheWrapper;

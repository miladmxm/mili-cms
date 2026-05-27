import { Suspense } from "react";

import type { SearchParams } from "@/types/type";

import { UI_SETTING } from "@/constant/uiSetting";
import { getPublishedProducts } from "@/features/product/dal/query";
import { getPageRenderItemCounterByOffsetInSearchParams } from "@/utils/getFromSearchParams";

import CategoryLinks from "./categories";
import ShopFilters from "./filters";
import FilterAndSort from "./filters/filterAndSortWrapper";
import Loadmore from "./loadmore";
import Products, { ProductsSkeleton } from "./products";
import ProductsWrapper from "./productsWrapper";

const MainContent = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const limit = await getPageRenderItemCounterByOffsetInSearchParams(
    searchParams,
    UI_SETTING.shop_products_limit,
  );
  const products = getPublishedProducts({
    limit,
    offset: 0,
  });
  return (
    <ProductsWrapper>
      <CategoryLinks />
      <FilterAndSort />
      <div className="flex gap-4">
        <Suspense>
          <ShopFilters />
        </Suspense>
        <div className="@container flex-auto">
          <Suspense fallback={<ProductsSkeleton />}>
            <Products productsPromise={products} />
            <Loadmore productsPromise={products} />
          </Suspense>
        </div>
      </div>
    </ProductsWrapper>
  );
};

export default MainContent;

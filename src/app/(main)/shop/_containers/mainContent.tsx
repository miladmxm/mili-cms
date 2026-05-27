import { Suspense } from "react";

import type { SearchParams } from "@/types/type";

import CategoryLinks from "./categories";
import ShopFilters from "./filters";
import FilterAndSort from "./filters/filterAndSortWrapper";
import Loadmore from "./loadmore";
import Products, { ProductsSkeleton } from "./products";
import ProductsWrapper from "./productsWrapper";

const MainContent = ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
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
            <Products searchParams={searchParams} />
            <Loadmore />
          </Suspense>
        </div>
      </div>
    </ProductsWrapper>
  );
};

export default MainContent;

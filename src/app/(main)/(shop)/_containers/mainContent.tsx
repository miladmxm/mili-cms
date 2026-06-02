import { Suspense } from "react";

import type { Option } from "@/services/product/type";
import type { SearchParams } from "@/types/type";

import { UI_SETTING } from "@/constant/uiSetting";
import {
  getPublicOptions,
  getPublishedProductsWithFilter,
} from "@/features/product/dal/query";
import {
  getItemFromSearchParam,
  getPageRenderItemCounterByOffsetInSearchParams,
} from "@/utils/getFromSearchParams";

import CategoryLinks from "./categories";
import ShopFilters from "./filters";
import FilterAndSort from "./filters/filterAndSortWrapper";
import Loadmore from "./loadmore";
import Products, { ProductsSkeleton } from "./products";
import ProductsWrapper from "./productsWrapper";

const getMinMaxPriceFilter = (
  searchParams: SearchParams,
): { min: number; max: number } | undefined => {
  const priceMin = getItemFromSearchParam({
    selectorKey: "price-min",
    defaultValue: "",
    searchParams,
  });
  const priceMax = getItemFromSearchParam({
    selectorKey: "price-max",
    defaultValue: "",
    searchParams,
  });
  const min = parseInt(priceMin, 10) * 10_000_000;
  const max = parseInt(priceMax, 10) * 10_000_000;
  if (isNaN(min) || isNaN(max)) return undefined;
  return { min, max };
};

const getOptionsFilterFromSearchParams = ({
  options,
  searchParams,
}: {
  options: Option[];
  searchParams: SearchParams;
}) => {
  const opt: Record<string, string> = {};

  for (const option of options) {
    const value = getItemFromSearchParam({
      defaultValue: "",
      selectorKey: option.slug,
      searchParams,
    });

    if (value) {
      opt[option.slug] = value;
    }
  }

  return opt;
};

const MainContent = async ({
  searchParams,
  categorySlug,
}: {
  searchParams: Promise<SearchParams>;
  categorySlug?: Promise<{
    slug: string;
  }>;
}) => {
  const options = await getPublicOptions();
  const limit = await getPageRenderItemCounterByOffsetInSearchParams(
    searchParams,
    UI_SETTING.shop_products_limit,
  );
  const awatedSearchParams = await searchParams;
  const discountFilter = !!getItemFromSearchParam({
    defaultValue: "",
    selectorKey: "discount",
    searchParams: awatedSearchParams,
  });
  const slug = categorySlug ? (await categorySlug)?.slug : undefined;
  const priceFilter = getMinMaxPriceFilter(awatedSearchParams);
  const optionsFilter = getOptionsFilterFromSearchParams({
    options,
    searchParams: awatedSearchParams,
  });
  const products = await getPublishedProductsWithFilter(
    {
      discount: discountFilter,
      price: priceFilter,
      optionItems: optionsFilter,
      categorySlug: slug,
    },
    {
      limit,
      offset: 0,
    },
  );
  return (
    <ProductsWrapper
      contextValue={{
        options,
        products,
        discountFilter,
        priceFilter,
        optionsFilter,
        slug,
      }}
    >
      <CategoryLinks />
      <FilterAndSort />
      <div className="flex gap-4">
        <Suspense>
          <ShopFilters options={options} />
        </Suspense>
        <div className="@container flex-auto">
          <Suspense fallback={<ProductsSkeleton />}>
            <Products products={products} />
            <Loadmore products={products} />
          </Suspense>
        </div>
      </div>
    </ProductsWrapper>
  );
};

export default MainContent;

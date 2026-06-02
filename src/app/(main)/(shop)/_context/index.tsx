"use client";

import type { PropsWithChildren } from "react";

import { createContext, use, useMemo } from "react";

import type { Option, Product } from "@/services/product/type";

export interface FilterParamsState {
  products: Promise<Product[]>;
  options: Option[];
  optionsFilter?: Record<string, string>;
  priceFilter?: {
    min: number;
    max: number;
  };
  slug?: string;
  discountFilter?: boolean;
}

const FilterParamsContext = createContext<FilterParamsState | undefined>(
  undefined,
);

FilterParamsContext.displayName = "FilterParamsContext";

export const useFilterParams = () => {
  const filterParams = use(FilterParamsContext);
  if (!filterParams) throw new Error("filter params context not provided");
  return filterParams;
};

const FilterParamsContextProvider = ({
  params,
  children,
}: PropsWithChildren<{
  params: FilterParamsState;
}>) => {
  const value = useMemo(() => ({ ...params }), [params]);
  return <FilterParamsContext value={value}>{children}</FilterParamsContext>;
};

export default FilterParamsContextProvider;

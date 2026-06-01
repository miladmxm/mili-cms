"use client";

import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import type { FilterParamsState } from "../_context";

import FilterParamsContextProvider from "../_context";
import { useFilterMenuStore } from "./filters/store";

const ProductsWrapper = ({
  children,
  contextValue,
}: PropsWithChildren<{
  className?: string;
  contextValue: FilterParamsState;
}>) => {
  const { open } = useFilterMenuStore();
  return (
    <div className="container">
      <div
        className={cn(
          "bg-white rounded-4xl md:rounded-7xl p-8 z-10 relative shadow-blur",
          { "max-md:z-40": open },
        )}
      >
        <FilterParamsContextProvider params={contextValue}>
          {children}
        </FilterParamsContextProvider>
      </div>
    </div>
  );
};

export default ProductsWrapper;

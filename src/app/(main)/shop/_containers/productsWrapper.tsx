import type { PropsWithChildren } from "react";

import type { FilterParamsState } from "../_context";

import FilterParamsContextProvider from "../_context";

const ProductsWrapper = ({
  children,
  contextValue,
}: PropsWithChildren<{
  className?: string;
  contextValue: FilterParamsState;
}>) => {
  return (
    <div className="container">
      <div className="bg-white rounded-4xl md:rounded-7xl p-8 z-30 relative shadow-blur">
        <FilterParamsContextProvider params={contextValue}>
          {children}
        </FilterParamsContextProvider>
      </div>
    </div>
  );
};

export default ProductsWrapper;

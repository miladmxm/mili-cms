"use client";
import type { PropsWithChildren } from "react";

import { createContext, use, useMemo } from "react";

import type { Product } from "@/services/product/type";

interface EditProductContextState {
  product: Product;
}
const EditProductContext = createContext<EditProductContextState | undefined>(
  undefined,
);
EditProductContext.displayName = "editProductContext";

export const useEditProductContext = () => {
  const editProductCtx = use(EditProductContext);
  if (!editProductCtx) return { product: undefined };
  return editProductCtx;
};
export const useEditProductContextRequire = () => {
  const editProductCtx = use(EditProductContext);
  if (!editProductCtx) throw new Error("product is not provided");
  return editProductCtx;
};
const EditProductContextProvider = ({
  product,
  children,
}: PropsWithChildren<{ product: Product }>) => {
  const value = useMemo(() => ({ product }), [product]);
  return <EditProductContext value={value}>{children}</EditProductContext>;
};

export default EditProductContextProvider;

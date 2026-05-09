"use client";

import type { PropsWithChildren } from "react";

import { createContext, use, useMemo } from "react";

import type { CategoryTree } from "@/services/product/type";

interface MailLayoutContextState {
  productCategories: CategoryTree[];
}

const MainLayoutContext = createContext<MailLayoutContextState | undefined>(
  undefined,
);
MainLayoutContext.displayName = "MainLayoutContext";

export const useMainLayoutContext = () => {
  const homePageContext = use(MainLayoutContext);
  if (!homePageContext) throw new Error("context is not found");
  return homePageContext;
};

const MainLayoutContextProvider = ({
  productCategories,
  children,
}: PropsWithChildren<MailLayoutContextState>) => {
  const value = useMemo(() => ({ productCategories }), [productCategories]);
  return <MainLayoutContext value={value}>{children}</MainLayoutContext>;
};

export default MainLayoutContextProvider;

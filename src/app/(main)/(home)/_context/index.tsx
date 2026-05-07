"use client";

import type { PropsWithChildren } from "react";

import { createContext, use, useMemo } from "react";

import type { CategoryTree } from "@/services/product/type";

interface HomePageContextState {
  productCategories: CategoryTree[];
}

const HomePageContext = createContext<HomePageContextState | undefined>(
  undefined,
);
HomePageContext.displayName = "HomePageContext";

export const useHomePageContext = () => {
  const homePageContext = use(HomePageContext);
  if (!homePageContext) throw new Error("context is not found");
  return homePageContext;
};

const HomePageContextProvider = ({
  productCategories,
  children,
}: PropsWithChildren<HomePageContextState>) => {
  const value = useMemo(() => ({ productCategories }), [productCategories]);
  return <HomePageContext value={value}>{children}</HomePageContext>;
};

export default HomePageContextProvider;

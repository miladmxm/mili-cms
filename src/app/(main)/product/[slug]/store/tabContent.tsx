"use client";

import type { PropsWithChildren } from "react";
import type { StoreApi } from "zustand";

import { createContext, use, useRef } from "react";
import { createStore, useStore } from "zustand";

export const ProductContentTabs = {
  content: "مشخصات محصول",
  comments: "نظرات",
  qa: "پرسش و پاسخ",
} as const;
export type ProductContentTabKeys = keyof typeof ProductContentTabs;

interface TabContentAction {
  setActiveTab: (tab: ProductContentTabKeys) => void;
}

interface TabContentStates extends TabContentAction {
  activeTab: ProductContentTabKeys;
}

const StoreContext = createContext<StoreApi<TabContentStates> | null>(null);
StoreContext.displayName = "StoreContext";

const TabContentProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreApi<TabContentStates>>(null);

  if (storeRef.current === null) {
    storeRef.current = createStore<TabContentStates>((set) => ({
      activeTab: "content",
      setActiveTab: (activeTab: ProductContentTabKeys) => set({ activeTab }),
    }));
  }

  // eslint-disable-next-line react-hooks/refs
  return <StoreContext value={storeRef.current}>{children}</StoreContext>;
};

export default TabContentProvider;

export function useTabContext<T>(selector: (state: TabContentStates) => T): T {
  const store = use(StoreContext);
  if (!store) throw new Error("Missing Provider in the tree");
  return useStore(store, selector);
}

import { create } from "zustand";

import type { Article } from "@/services/article/types";
import type { Product } from "@/services/product/type";

interface SearchbarStates {
  open: boolean;
  products: Product[];
  articles: Article[];
}

export const useSearchbarStore = create<SearchbarStates>(() => ({
  open: false,
  products: [],
  articles: [],
}));

export const setCloseSearchbar = () =>
  useSearchbarStore.setState({ open: false });
export const setOpenSearchbar = () =>
  useSearchbarStore.setState({ open: true });
export const setProductsAndArticles = (state: Omit<SearchbarStates, "open">) =>
  useSearchbarStore.setState({ ...state });

export const addProductsAndArticles = (
  state: Omit<SearchbarStates, "open">,
) => {
  const { articles, products } = useSearchbarStore.getState();
  useSearchbarStore.setState({
    products: [...products, ...state.products],
    articles: [...articles, ...state.articles],
  });
};

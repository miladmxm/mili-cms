import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

import { searchAction } from "@/app/(main)/_action/search";

import { SEARCH_LIMIT } from "../constant";
import { addProductsAndArticles, useSearchbarStore } from "../store";

export const useSearchResult = () => {
  const inViewRef = useRef<HTMLSpanElement>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { articles, products } = useSearchbarStore(
    useShallow((state) => ({
      products: state.products,
      articles: state.articles,
    })),
  );

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("search-page") || "1", 10);
  const isLoadEnded =
    products.length < page * SEARCH_LIMIT &&
    articles.length < page * SEARCH_LIMIT;

  const isBottom = () => {
    if (inViewRef.current === null) return false;

    return inViewRef.current.getBoundingClientRect().top <= window.innerHeight;
  };

  const handleScroll = () => {
    if (isBottom() && !isLoadEnded && !pending) {
      const q = searchParams.get("q");
      if (!q) return;

      startTransition(async () => {
        router.push(`?q=${q}&search-page=${page + 1}`, { scroll: false });
        const result = await searchAction({ q, page });
        addProductsAndArticles(result);
      });
    }
  };

  return { handleScroll, inViewRef, pending, isLoadEnded };
};

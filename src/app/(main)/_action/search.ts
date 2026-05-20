"use server";

import type { Article } from "@/services/article/types";
import type { Product } from "@/services/product/type";

import { searchArticles } from "@/features/article/dal/query";
import { searchProducts } from "@/features/product/dal/query";

import { SEARCH_LIMIT } from "../_containers/search/constant";

export const searchAction = async ({
  q,
  page = 0,
}: {
  q: string;
  page?: number;
}): Promise<{ products: Product[]; articles: Article[] }> => {
  const products = await searchProducts(q, {
    limit: SEARCH_LIMIT,
    offset: page * SEARCH_LIMIT,
  });
  const articles = await searchArticles(q, {
    limit: SEARCH_LIMIT,
    offset: page * SEARCH_LIMIT,
  });
  return { articles, products };
};

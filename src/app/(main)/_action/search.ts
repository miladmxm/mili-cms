"use server";

import type { Article } from "@/services/article/types";
import type { Product } from "@/services/product/type";

import { searchArticles } from "@/features/article/dal/query";
import { searchProducts } from "@/features/product/dal/query";

export const searchAction = async ({
  q,
}: {
  q: string;
}): Promise<{ products: Product[]; articles: Article[] }> => {
  const products = await searchProducts(q, { limit: 5, offset: 0 });
  const articles = await searchArticles(q, { limit: 5, offset: 0 });
  return { articles, products };
};

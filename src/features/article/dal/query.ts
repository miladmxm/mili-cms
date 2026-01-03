import { cacheTag } from "next/cache";

import { DTOconvertMediaPathToRealUrl } from "@/features/media/dal/queries";
import "server-only";

import * as articleRepo from "@/repositories/article.repo";

import type { Category } from "../types";

export const getArticles = async () => {
  //todo has access
  "use cache";
  cacheTag("articles");
  return articleRepo.findArticlesByLimitAndOffset();
};
export const getCategories = async () => {
  "use cache";
  cacheTag("article-categories");
  const categories = await articleRepo.findCategories();
  const categoriesWithThumbnail = categories.map((category) => {
    const newCategory: Category = { ...category, thumbnail: undefined };

    if (category.thumbnail && category.thumbnail.url) {
      newCategory.thumbnail = {
        url: DTOconvertMediaPathToRealUrl(category.thumbnail.url),
        alt: category.thumbnail.meta.alt,
      };
    }
    return newCategory;
  });
  return categoriesWithThumbnail;
};

import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import "server-only";

import { DTOconvertMediaPathToRealUrl } from "@/features/media/dal/queries";
import * as articleRepo from "@/repositories/article.repo";

import type { Category } from "../types";

export const getArticles = async () => {
  //todo has access
  "use cache";
  cacheTag(CacheKeys.articles);
  return articleRepo.findArticlesByLimitAndOffset();
};
export const getArticle = async (id: string) => {
  "use cache";
  cacheTag(`${CacheKeys.articles}-${id}`);
  return articleRepo.findArticleById(id);
};
export const getCategories = async () => {
  "use cache";
  cacheTag(CacheKeys.articleCategories);
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

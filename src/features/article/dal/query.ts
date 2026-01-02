import { cacheTag } from "next/cache";

import * as articleRepo from "@/repositories/article.repo";
import "server-only";

export const getArticles = async () => {
  //todo has access
  "use cache";
  cacheTag("articles");
  return articleRepo.findArticlesByLimitAndOffset();
};
export const getCategories = async () => {
  "use cache";
  cacheTag("article-categories");
  return articleRepo.findCategories();
};

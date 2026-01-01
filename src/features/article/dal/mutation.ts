import * as articleRepo from "@/repositories/article.repo";
import "server-only";

import type { ArticleStatus, CreateArticle } from "../types";

export const createArticle = (data: CreateArticle) => {
  //todo has access
  return articleRepo.createArticle(data);
};
export const updateStatus = (id: string, status: ArticleStatus) => {
  //todo has access
  return articleRepo.updateArticleById(id, { status });
};
export const deleteArticle = (id: string) => {
  //todo has access
  return articleRepo.deleteArticleById(id);
};

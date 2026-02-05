import "server-only";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as articleService from "@/services/article";

import type {
  ArticleStatus,
  CreateArticle,
  CreateCategory,
} from "../../../services/article/types";

export const createArticle = async (data: CreateArticle) => {
  const article = dalRequireAuth(
    () => dalDbOperation(() => articleService.createArticle(data)),
    { blog: ["create"] },
  );
  return article;
};
export const updateArticle = (id: string, data: Partial<CreateArticle>) => {
  return dalRequireAuth(
    () => dalDbOperation(() => articleService.updateArticle(id, data)),
    { blog: ["update"] },
  );
};
export const updateStatus = (id: string, status: ArticleStatus) => {
  const article = dalRequireAuth(
    () => dalDbOperation(() => articleService.updateArticleStatus(id, status)),
    { blog: ["update"] },
  );
  return article;
};
export const deleteArticle = (id: string) => {
  return dalRequireAuth(
    () => dalDbOperation(() => articleService.deleteArticle(id)),
    {
      blog: ["delete"],
    },
  );
};

export const createCategory = async (categoryData: CreateCategory) => {
  return dalRequireAuth(
    () => dalDbOperation(() => articleService.createCategory(categoryData)),
    { blog: ["create"] },
  );
};
export const deleteCategory = (id: string) => {
  return dalRequireAuth(
    () => dalDbOperation(() => articleService.deleteCategory(id)),
    { blog: ["delete"] },
  );
};

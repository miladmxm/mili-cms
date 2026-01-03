import "server-only";

import { checkMediaType } from "@/features/media/dal/queries";
import { convertToSlug, generateUniqueSlug } from "@/lib/slug";
import * as articleRepo from "@/repositories/article.repo";

import type { ArticleStatus, CreateArticle, CreateCategory } from "../types";

export const createArticle = async (data: CreateArticle) => {
  //todo has access
  if (data.thumbnail) {
    await checkMediaType(data.thumbnail, "image");
  }
  let slug: string = convertToSlug(data.slug);
  const existing = await articleRepo.findArticleByStartedSlugWith(slug);
  slug = generateUniqueSlug(
    slug,
    existing.map((a) => a.slug),
  );
  return articleRepo.createArticle({ ...data, slug });
};
export const updateStatus = (id: string, status: ArticleStatus) => {
  //todo has access
  return articleRepo.updateArticleById(id, { status });
};
export const deleteArticle = (id: string) => {
  //todo has access
  return articleRepo.deleteArticleById(id);
};

export const createCategory = async (categoryData: CreateCategory) => {
  //todo has access
  if (categoryData.thumbnail) {
    await checkMediaType(categoryData.thumbnail, "image");
  }
  const category = (await articleRepo.createArticleCategory(categoryData))[0];
  return category;
};
export const deleteCategory = (id: string) => {
  //todo has access
  return articleRepo.deleteArticleCategoryById(id);
};

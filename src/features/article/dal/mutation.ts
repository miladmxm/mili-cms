import "server-only";

import { ThrowableDalError } from "@/dal/types";
import { checkMediaType } from "@/features/media/dal/queries";
import { convertToSlug, generateUniqueSlug } from "@/lib/slug";
import * as articleRepo from "@/repositories/article.repo";

import type { ArticleStatus, CreateArticle, CreateCategory } from "../types";

export const createArticle = async (data: CreateArticle) => {
  //todo has access
  if (data.thumbnail) {
    await checkMediaType(data.thumbnail, "image");
  }
  const categories = await articleRepo.findCategoriesByIds(data.categoryIds);

  let slug: string = convertToSlug(data.slug);
  const existing = await articleRepo.findArticleByStartedSlugWith(slug);
  slug = generateUniqueSlug(
    slug,
    existing.map((a) => a.slug),
  );
  const article = (await articleRepo.createArticle({ ...data, slug }))[0];

  if (!article) throw new ThrowableDalError({ type: "no-access" });

  await articleRepo.addArticleToCategories(
    categories.map(({ id }) => ({ categoryId: id, articleId: article.id })),
  );
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

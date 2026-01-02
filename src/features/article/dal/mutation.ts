import { convertToSlug, generateUniqueSlug } from "@/lib/slug";
import "server-only";

import * as articleRepo from "@/repositories/article.repo";
import * as mediaRepo from "@/repositories/media.repo";

import type { ArticleStatus, Category, CreateArticle } from "../types";

export const createArticle = async (data: CreateArticle) => {
  //todo has access
  if (data.thumbnail) {
    const media = await mediaRepo.findMediaById(data.thumbnail);
    if (!media || media.type !== "image") {
      throw new Error("تصویر شاخص نامعتبر است");
    }
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

export const createCategory = async (categoryData: Category) => {
  //todo has access
  // const category = (await categoryRepo.createCategory(categoryData))[0];
  // articleRepo.createArticleCategory()
};

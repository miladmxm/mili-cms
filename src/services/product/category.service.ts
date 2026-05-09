import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import { convertToSlug, generateUniqueSlug } from "@/lib/slug";
import * as productRepo from "@/repositories/product.repo";

import type { Category, CreateCategory } from "./type";

import { checkMediaType } from "../media";
import { DTOconvertMediaPathToRealUrl } from "../media/dto";

// * READ
export const getCategoriesWithThumbnail = async () => {
  "use cache";

  cacheTag(CacheKeys.productCategories);
  const categories = await productRepo.findCategories();

  const categoriesWithThumbnail = categories.map((category) => {
    const newCategory: Category = {
      ...category,
      thumbnail: undefined,
      vector: undefined,
    };

    if (category.thumbnail && category.thumbnail.url) {
      newCategory.thumbnail = {
        url: DTOconvertMediaPathToRealUrl(category.thumbnail.url),
        id: category.id,
        alt: category.thumbnail.meta.alt,
      };
    }
    if (category.vector && category.vector.url) {
      newCategory.vector = {
        url: DTOconvertMediaPathToRealUrl(category.vector.url),
        id: category.id,
        alt: category.vector.meta.alt,
      };
    }

    return newCategory;
  });
  return categoriesWithThumbnail;
};

// * CREATE
export const createCategory = async (data: CreateCategory) => {
  if (data.thumbnailId) {
    await checkMediaType(data.thumbnailId, "image");
  }
  if (data.vectorId) {
    await checkMediaType(data.vectorId, "image");
  }

  let slug: string = convertToSlug(data.slug);
  const existingArticleBySlug =
    await productRepo.findCategoryByStartedSlugWith(slug);
  slug = generateUniqueSlug(
    slug,
    existingArticleBySlug.map((a) => a.slug),
  );
  const category = (await productRepo.createCategory({ ...data, slug }))[0];
  return category;
};

// * UPDATE
export const updateCategory = async (
  id: string,
  input: Partial<CreateCategory>,
) => {
  const data = input;

  if (data.thumbnailId) {
    await checkMediaType(data.thumbnailId, "image");
  }
  if (data.vectorId) {
    await checkMediaType(data.vectorId, "image");
  }
  if (data.slug) {
    data.slug = convertToSlug(data.slug);
    const existingArticleBySlug =
      await productRepo.findCategoryByStartedSlugWith(data.slug);
    data.slug = generateUniqueSlug(
      data.slug,
      existingArticleBySlug.map((a) => a.slug),
    );
  }

  return productRepo.updateCategoryById(id, data);
};

// * DELETE
export const deleteCategory = (id: string) => {
  return productRepo.deleteProductCategoryById(id);
};

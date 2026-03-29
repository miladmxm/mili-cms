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
    const newCategory: Category = { ...category, thumbnail: undefined };

    if (category.thumbnail && category.thumbnail.url) {
      newCategory.thumbnail = {
        url: DTOconvertMediaPathToRealUrl(category.thumbnail.url),
        id: category.id,
        alt: category.thumbnail.meta.alt,
      };
    }
    return newCategory;
  });
  return categoriesWithThumbnail;
};

// * CREATE
export const createCategory = async (data: CreateCategory) => {
  if (data.thumbnail) {
    await checkMediaType(data.thumbnail, "image");
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

// * DELETE
export const deleteCategory = (id: string) => {
  return productRepo.deleteProductCategoryById(id);
};

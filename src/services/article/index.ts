import { cacheTag } from "next/cache";

import type {
  ArticleStatus,
  Category,
  CreateArticle,
  CreateCategory,
} from "@/services/article/types";

import { CacheKeys } from "@/constant/cacheKeys";
import { convertToSlug, generateUniqueSlug } from "@/lib/slug";
import { withTransaction } from "@/repositories";
import * as articleRepo from "@/repositories/article.repo";

import type { Media } from "../media/type";
import type { LimitAndOffset } from "../type";

import { checkMediaType } from "../media";
import { DTOconvertMediaPathToRealUrl } from "../media/dto";

// * READ
export const getPaginationArticles = async (
  limitAndOffset?: LimitAndOffset,
) => {
  "use cache";

  cacheTag(CacheKeys.articles);

  return articleRepo.findArticlesByLimitAndOffset(limitAndOffset);
};

export const getArticle = async (id: string) => {
  "use cache";

  cacheTag(`${CacheKeys.articles}-${id}`);
  const article = await articleRepo.findArticleById(id);
  if (!article) return article;
  let thumbnail: Media | undefined;

  if (article.thumbnail && typeof article.thumbnail !== "string") {
    // eslint-disable-next-line prefer-destructuring
    thumbnail = article.thumbnail;
  }
  if (thumbnail) {
    thumbnail.url = DTOconvertMediaPathToRealUrl(thumbnail.url);
  }

  return { ...article, thumbnail };
};

export const getCategoriesWithThumbnail = async () => {
  "use cache";

  cacheTag(CacheKeys.articleCategories);
  const categories = await articleRepo.findCategories();

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

// CREATE
export const createArticle = async (data: CreateArticle) => {
  if (data.thumbnail) {
    await checkMediaType(data.thumbnail, "image");
  }

  const categories = await articleRepo.findCategoriesByIds(data.categoryIds);
  let slug: string = convertToSlug(data.slug);
  const existingArticleBySlug =
    await articleRepo.findArticleByStartedSlugWith(slug);
  slug = generateUniqueSlug(
    slug,
    existingArticleBySlug.map((a) => a.slug),
  );
  const resultId = await withTransaction(async (tx) => {
    const article = (await articleRepo.createArticle({ ...data, slug }, tx))[0];
    if (!article) throw new Error("DB error to create article");
    if (categories.length)
      await articleRepo.addArticleToCategories(
        categories.map(({ id }) => ({ categoryId: id, articleId: article.id })),
        tx,
      );
    return article;
  });
  return resultId.id;
};

export const createCategory = async (data: CreateCategory) => {
  if (data.thumbnail) {
    await checkMediaType(data.thumbnail, "image");
  }

  let slug: string = convertToSlug(data.slug);
  const existingArticleBySlug =
    await articleRepo.findCategoryByStartedSlugWith(slug);
  slug = generateUniqueSlug(
    slug,
    existingArticleBySlug.map((a) => a.slug),
  );
  const category = (
    await articleRepo.createArticleCategory({ ...data, slug })
  )[0];
  return category;
};

// UPDATE
const diffCategoryForUpdate = (prevIds: string[], nextIds: string[]) => {
  const remove: string[] = [];
  const add: string[] = [];
  prevIds.forEach((prevId) => {
    if (!nextIds.includes(prevId)) {
      remove.push(prevId);
    }
  });
  nextIds.forEach((nextId) => {
    if (!prevIds.includes(nextId)) {
      add.push(nextId);
    }
  });
  return { remove, add };
};

export const updateArticle = async (
  id: string,
  input: Partial<CreateArticle>,
) => {
  const data = input;
  const article = await articleRepo.findArticleById(id);
  if (!article) throw new Error("not found");
  console.log(data);

  if (data.thumbnail) {
    await checkMediaType(data.thumbnail, "image");
  }

  let categoryIds: string[] = [];

  if (data.categoryIds) {
    categoryIds = (await articleRepo.findCategoriesByIds(data.categoryIds)).map(
      ({ id: categoryId }) => categoryId,
    );
  }
  if (data.slug) {
    data.slug = convertToSlug(data.slug);
    const existingArticleBySlug =
      await articleRepo.findArticleByStartedSlugWith(data.slug);
    data.slug = generateUniqueSlug(
      data.slug,
      existingArticleBySlug.map((a) => a.slug),
    );
  }

  const result = await withTransaction(async (tx) => {
    if (categoryIds && categoryIds.length > 0) {
      const { add, remove } = diffCategoryForUpdate(
        article.categoryIds,
        categoryIds,
      );

      if (remove.length) {
        await articleRepo.deleteRelatedCategoryByArticleId(
          {
            articleId: article.id,
            categoryIds: remove,
          },
          tx,
        );
      }
      if (add.length) {
        await articleRepo.addArticleToCategories(
          add.map((categoryId) => ({ articleId: article.id, categoryId })),
          tx,
        );
      }
    }

    return articleRepo.updateArticleById(id, data, tx);
  });
  return result;
};

export const updateArticleStatus = async (
  id: string,
  status: ArticleStatus,
) => {
  return articleRepo.updateArticleById(id, { status });
};

export const updateCategory = async (
  id: string,
  input: Partial<CreateCategory>,
) => {
  const data = input;

  if (data.slug) {
    data.slug = convertToSlug(data.slug);
    const existingArticleBySlug =
      await articleRepo.findCategoryByStartedSlugWith(data.slug);
    data.slug = generateUniqueSlug(
      data.slug,
      existingArticleBySlug.map((a) => a.slug),
    );
  }

  return articleRepo.updateCategoryById(id, data);
};

// DELETE
export const deleteArticle = (id: string) => {
  return articleRepo.deleteArticleById(id);
};

export const deleteCategory = (id: string) => {
  return articleRepo.deleteArticleCategoryById(id);
};

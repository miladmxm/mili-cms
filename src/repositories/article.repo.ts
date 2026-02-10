import { and, desc, eq, inArray, like } from "drizzle-orm";

import type { OffsetLimit } from "@/types/repo";

import {
  article,
  articleCategory,
  articleToCategory,
} from "@/db/drizzle/schemas";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const createArticle = (
  value: typeof article.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(article).values(value).returning({ id: article.id });

export const findArticleById = async (id: string, tx?: Transaction) => {
  const findedArticle = await getDBorTX(tx).query.article.findFirst({
    where: eq(article.id, id),
    with: {
      categories: { columns: { categoryId: true } },
      thumbnail: true,
    },
  });
  if (!findedArticle) return findedArticle;

  const categoryIds = findedArticle.categories.map(
    ({ categoryId }) => categoryId,
  );
  return {
    ...findedArticle,
    categoryIds,
  };
};

export const findArticleBySlug = async (slug: string, tx?: Transaction) =>
  getDBorTX(tx).query.article.findFirst({
    where: eq(article.slug, slug),
  });
export const findArticleByStartedSlugWith = async (
  slug: string,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.article.findMany({
    where: like(article.slug, `${slug}%`),
  });
export const findCategoryByStartedSlugWith = async (
  slug: string,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.articleCategory.findMany({
    where: like(articleCategory.slug, `${slug}%`),
  });
export const findCategories = async (tx?: Transaction) => {
  const categories = await getDBorTX(tx).query.articleCategory.findMany({
    with: { thumbnail: { columns: { url: true, meta: true } } },
    orderBy: [desc(articleCategory.createdAt)],
  });
  return categories;
};
export const findCategoriesByIds = async (ids: string[], tx?: Transaction) => {
  return await getDBorTX(tx).query.articleCategory.findMany({
    where: inArray(articleCategory.id, ids),
  });
};

export const findArticlesByLimitAndOffset = (
  options?: OffsetLimit,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.article.findMany({
    orderBy: [desc(article.createdAt)],
    limit: options?.limit,
    offset: options?.offset,
  });
export const updateArticleById = (
  id: string,
  value: Partial<typeof article.$inferSelect>,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .update(article)
    .set(value)
    .where(eq(article.id, id))
    .returning();

export const updateCategoryById = (
  id: string,
  value: Partial<typeof articleCategory.$inferInsert>,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .update(articleCategory)
    .set(value)
    .where(eq(articleCategory.id, id))
    .returning();
export const deleteArticleById = (id: string, tx?: Transaction) =>
  getDBorTX(tx).delete(article).where(eq(article.id, id));

export const createArticleCategory = (
  data: typeof articleCategory.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(articleCategory).values(data).returning();
export const deleteArticleCategoryById = (id: string, tx?: Transaction) =>
  getDBorTX(tx).delete(articleCategory).where(eq(articleCategory.id, id));

export const addArticleToCategories = (
  articleToCategories: (typeof articleToCategory.$inferInsert)[],
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .insert(articleToCategory)
    .values(articleToCategories)
    .onConflictDoNothing();

export const deleteRelatedCategoryByArticleId = (
  { articleId, categoryIds }: { articleId: string; categoryIds: string[] },
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .delete(articleToCategory)
    .where(
      and(
        eq(articleToCategory.articleId, articleId),
        inArray(articleToCategory.categoryId, categoryIds),
      ),
    );

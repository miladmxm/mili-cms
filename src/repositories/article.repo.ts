import { desc, eq, like } from "drizzle-orm";

import type { OffsetLimit } from "@/types/repo";

import { db } from "@/db/drizzle/db";
import { article, articleCategory } from "@/db/drizzle/schemas";

export const createArticle = (value: typeof article.$inferInsert) =>
  db.insert(article).values(value);

export const findArticleBySlug = async (slug: string) =>
  db.query.article.findFirst({
    where: eq(article.slug, slug),
  });
export const findArticleByStartedSlugWith = async (slug: string) =>
  db.query.article.findMany({
    where: like(article.slug, `${slug}%`),
  });
export const findCategories = async () => {
  const categories = await db.query.articleCategory.findMany({
    with: { thumbnail: { columns: { url: true } } },
  });
  return categories;
};
export const findArticlesByLimitAndOffset = (options?: OffsetLimit) =>
  db.query.article.findMany({
    orderBy: [desc(article.createdAt)],
    limit: options?.limit,
    offset: options?.offset,
  });
export const updateArticleById = (
  id: string,
  value: Partial<typeof article.$inferSelect>,
) => db.update(article).set(value).where(eq(article.id, id));

export const deleteArticleById = (id: string) =>
  db.delete(article).where(eq(article.id, id));

export const createArticleCategory = (
  data: typeof articleCategory.$inferInsert,
) => db.insert(articleCategory).values(data).returning();

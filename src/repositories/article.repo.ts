import { desc, eq } from "drizzle-orm";

import type { OffsetLimit } from "@/types/repo";

import { db } from "@/db/drizzle/db";
import { article } from "@/db/drizzle/schemas";

export const createArticle = (value: typeof article.$inferInsert) =>
  db.insert(article).values(value);

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

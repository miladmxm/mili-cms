import { db } from "@/db/drizzle/db";
import { article } from "@/db/drizzle/schemas";

export const createArticle = (value: typeof article.$inferInsert) =>
  db.insert(article).values(value);

import { db } from "@/db/drizzle/db";
import { articleCategory } from "@/db/drizzle/schemas";

export const createCategory = (data: typeof articleCategory.$inferInsert) =>
  db.insert(articleCategory).values(data).returning({ id: articleCategory.id });

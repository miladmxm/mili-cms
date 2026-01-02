import { db } from "@/db/drizzle/db";
import { category } from "@/db/drizzle/schemas";

export const createCategory = (data: typeof category.$inferInsert) =>
  db.insert(category).values(data).returning({ id: category.id });

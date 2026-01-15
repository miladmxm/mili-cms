import { articleCategory } from "@/db/drizzle/schemas";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const createCategory = (
  data: typeof articleCategory.$inferInsert,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .insert(articleCategory)
    .values(data)
    .returning({ id: articleCategory.id });

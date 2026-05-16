import { desc, eq } from "drizzle-orm";

import type { OffsetLimit } from "@/types/repo";

import { portfolio } from "@/db/drizzle/schemas";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const findPortfolioByOffsetAndLimit = (
  options?: OffsetLimit,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.portfolio.findMany({
    orderBy: desc(portfolio.createdAt),
    with: { thumbnail: true },
    limit: options?.limit,
    offset: options?.offset,
  });
export const findPortfolioById = (id: string, tx?: Transaction) =>
  getDBorTX(tx).query.portfolio.findFirst({
    with: { thumbnail: true },
    where: eq(portfolio.id, id),
  });

export const createPortfolio = (
  data: typeof portfolio.$inferInsert,
  tx?: Transaction,
) =>
  getDBorTX(tx).insert(portfolio).values(data).returning({ id: portfolio.id });

export const deletePortfolioById = (id: string, tx?: Transaction) =>
  getDBorTX(tx)
    .delete(portfolio)
    .where(eq(portfolio.id, id))
    .returning({ id: portfolio.id });

export const editPortfolioById = (
  id: string,
  data: typeof portfolio.$inferInsert,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .update(portfolio)
    .set(data)
    .where(eq(portfolio.id, id))
    .returning({ id: portfolio.id });

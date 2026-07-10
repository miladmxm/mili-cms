import { desc, eq } from "drizzle-orm";

import { address } from "@/db/drizzle/schemas";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const findAddressByUserId = (userId: string, tx?: Transaction) =>
  getDBorTX(tx).query.address.findMany({
    where: eq(address.userId, userId),
    orderBy: desc(address.createdAt),
  });

export const createAddress = (
  data: typeof address.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(address).values(data).returning({ id: address.id });

import { desc } from "drizzle-orm";

import type { OffsetLimit } from "@/types/repo";

import { comment } from "@/db/drizzle/schemas";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const findAllCommentsWithRelations = (
  options?: OffsetLimit,
  tx?: Transaction,
) => {
  return getDBorTX(tx).query.comment.findMany({
    orderBy: desc(comment.createdAt),
    with: {
      author: {
        columns: { name: true, email: true, phoneNumber: true, id: true },
      },
      product: { with: { product: { columns: { name: true, id: true } } } },
      article: { with: { article: { columns: { title: true, id: true } } } },
    },
    limit: options?.limit,
    offset: options?.offset,
  });
};

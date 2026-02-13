import { and, desc, eq, inArray } from "drizzle-orm";

import type { FileMeta, MediaTypes } from "@/services/media/type";

import { media } from "@/db/drizzle/schemas";

import type { Transaction } from ".";
import type { OffsetAndLimit } from "./types";

import { getDBorTX } from ".";

export const createMedia = (
  data: typeof media.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(media).values(data).returning();

export const findMediaByLimit = (options?: OffsetAndLimit, tx?: Transaction) =>
  getDBorTX(tx).query.media.findMany({
    offset: options?.offset,
    limit: options?.limit,
    orderBy: [desc(media.createdAt)],
  });
export const findMediaByIdAndType = (
  id: string,
  type: MediaTypes,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.media.findFirst({
    where: and(eq(media.id, id), eq(media.type, type)),
  });
export const findMediaByTypesAndLimit = (
  {
    types,
    limit,
    offset,
  }: OffsetAndLimit & {
    types: MediaTypes[];
  },
  tx?: Transaction,
) =>
  getDBorTX(tx).query.media.findMany({
    offset,
    limit,
    where: inArray(media.type, types),
    orderBy: [desc(media.createdAt)],
  });
export const deleteMedia = async (id: string, tx?: Transaction) => {
  const result = await getDBorTX(tx)
    .delete(media)
    .where(eq(media.id, id))
    .returning();
  return result[0];
};
export const findMediaById = (id: string, tx?: Transaction) =>
  getDBorTX(tx).query.media.findFirst({ where: eq(media.id, id) });

export const updateMediaMeta = (id: string, data: FileMeta, tx?: Transaction) =>
  getDBorTX(tx).update(media).set({ meta: data }).where(eq(media.id, id));

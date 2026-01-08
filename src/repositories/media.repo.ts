import { and, desc, eq, inArray } from "drizzle-orm";

import type { FileMeta, MediaTypes } from "@/services/media/type";

import { db } from "@/db/drizzle/db";
import { media } from "@/db/drizzle/schemas";

export const createMedia = (data: typeof media.$inferInsert) =>
  db.insert(media).values(data).returning();
export const findMedias = () =>
  db.query.media.findMany({ orderBy: [desc(media.createdAt)] });
export const findMediaByIdAndType = (id: string, type: MediaTypes) =>
  db.query.media.findFirst({
    where: and(eq(media.id, id), eq(media.type, type)),
  });
export const findMediasByTypes = (types: MediaTypes[]) =>
  db.query.media.findMany({
    where: inArray(media.type, types),
    orderBy: [desc(media.createdAt)],
  });
export const deleteMedia = async (id: string) => {
  const result = await db.delete(media).where(eq(media.id, id)).returning();
  return result[0];
};
export const findMediaById = (id: string) =>
  db.query.media.findFirst({ where: eq(media.id, id) });

export const updateMediaMeta = (id: string, data: FileMeta) =>
  db.update(media).set({ meta: data }).where(eq(media.id, id));

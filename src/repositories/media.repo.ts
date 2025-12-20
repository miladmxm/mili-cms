import { desc, eq } from "drizzle-orm";

import { db } from "@/db/drizzle/db";
import { media } from "@/db/drizzle/schemas";

export const createMedia = (data: typeof media.$inferInsert) =>
  db.insert(media).values(data).returning();
export const findMedias = () =>
  db.query.media.findMany({ orderBy: [desc(media.createdAt)] });
export const deleteMedia = async (id: string) => {
  const result = await db.delete(media).where(eq(media.id, id)).returning();
  return result[0];
};
export const findMedia = (id: string) =>
  db.query.media.findFirst({ where: eq(media.id, id) });

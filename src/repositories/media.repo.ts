import { db } from "@/db/drizzle/db";
import { media } from "@/db/drizzle/schemas";

export const createMedia = (data: typeof media.$inferInsert) =>
  db.insert(media).values(data).returning();
export const findMedias = () => db.query.media.findMany();

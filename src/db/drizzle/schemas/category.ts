import type { AnyPgColumn } from "drizzle-orm/pg-core";

import { text, uuid, varchar } from "drizzle-orm/pg-core";

import { MainSchema } from "./main";
import { media } from "./media";

export const category = MainSchema.table("category", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  thumbnail: uuid("thumbnail").references(() => media.id, {
    onDelete: "set null",
  }),
  parentId: uuid("parent_id").references((): AnyPgColumn => category.id, {
    onDelete: "cascade",
  }),
});

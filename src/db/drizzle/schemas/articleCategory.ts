import type { AnyPgColumn } from "drizzle-orm/pg-core";

import { text, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

import { MainSchema } from "./main";
import { media } from "./media";

export const articleCategory = MainSchema.table(
  "article_category",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    thumbnail: uuid("thumbnail").references(() => media.id, {
      onDelete: "set null",
    }),
    parentId: uuid("parent_id").references(
      (): AnyPgColumn => articleCategory.id,
      {
        onDelete: "cascade",
      },
    ),
  },
  (table) => ({
    slugUnique: uniqueIndex("category_slug_unique").on(table.slug),
  }),
);

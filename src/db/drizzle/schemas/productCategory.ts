import type { AnyPgColumn } from "drizzle-orm/pg-core";

import {
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { MainSchema } from "./main";
import { media } from "./media";

export const productCategory = MainSchema.table(
  "product_category",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    thumbnail: uuid("thumbnail").references(() => media.id, {
      onDelete: "set null",
    }),
    parentId: uuid("parent_id").references(
      (): AnyPgColumn => productCategory.id,
      {
        onDelete: "cascade",
      },
    ),
  },
  (table) => ({
    slugUnique: uniqueIndex("product_category_slug_unique").on(table.slug),
  }),
);

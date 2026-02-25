import {
  jsonb,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import type { ArticleStatus } from "@/services/article/types";
import type { ProseMirror } from "@/types/type";

import { articleStatus } from "./article";
import { user } from "./auth";
import { comment } from "./comment";
import { MainSchema, RelationSchema } from "./main";
import { media } from "./media";
import { productCategory } from "./productCategory";
import { rate } from "./rate";

export const product = MainSchema.table(
  "product",
  {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name").notNull(),
    content: jsonb("content").$type<ProseMirror>().notNull().default({}),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    excerpt: text("excerpt").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    thumbnail: uuid("thumbnail").references(() => media.id, {
      onDelete: "set null",
    }),
    authorId: text("author_id")
      .references(() => user.id)
      .notNull(),
    status: articleStatus("status")
      .notNull()
      .$type<ArticleStatus>()
      .default("draft"),
  },
  (table) => ({
    slugUnique: uniqueIndex("product_slug_unique").on(table.slug),
  }),
);
export const productToComments = RelationSchema.table(
  "product_to_comments",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    commentId: uuid("comment_id")
      .notNull()
      .references(() => comment.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.productId, table.commentId] })],
);
export const productToCategory = RelationSchema.table(
  "product_to_category",
  {
    productId: uuid("product_id")
      .references(() => product.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => productCategory.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.productId, table.categoryId] })],
);

export const productToRate = RelationSchema.table(
  "product_to_rate",
  {
    productId: uuid("product_id")
      .references(() => product.id, { onDelete: "cascade" })
      .notNull(),
    rateId: uuid("rate_id")
      .references(() => rate.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.productId, table.rateId] })],
);

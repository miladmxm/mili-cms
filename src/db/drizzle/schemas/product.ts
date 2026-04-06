import {
  integer,
  jsonb,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import type {
  ProductPrice,
  ProductStatus,
  ProductType,
} from "@/services/product/type";
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
    thumbnailId: uuid("thumbnail_id").references(() => media.id, {
      onDelete: "set null",
    }),
    authorId: text("author_id")
      .references(() => user.id)
      .notNull(),
    status: articleStatus("status")
      .notNull()
      .$type<ProductStatus>()
      .default("draft"),
    type: text({ enum: ["default", "variable"] })
      .$type<ProductType>()
      .default("default"),
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

export const productGallery = RelationSchema.table(
  "product_gallery",
  {
    productId: uuid("product_id")
      .references(() => product.id, {
        onDelete: "cascade",
      })
      .notNull(),
    mediaId: uuid("media_id")
      .references(() => media.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.productId, table.mediaId] })],
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

export const productToOptionItem = RelationSchema.table(
  "product_to_option_item",
  {
    productId: uuid("product_id")
      .references(() => product.id, { onDelete: "cascade" })
      .notNull(),
    optionItemId: uuid("option_item_id")
      .references(() => rate.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.productId, table.optionItemId] })],
);

export const productMeta = MainSchema.table("product_meta", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  price: jsonb("price").$type<ProductPrice>().notNull(),
  stock: integer("stock").notNull().default(-1),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  thumbnailId: uuid("thumbnail_id").references(() => media.id, {
    onDelete: "set null",
  }),
  optionItemIds: text("option_item_ids"),
});

import { sql } from "drizzle-orm";
import {
  integer,
  jsonb,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import type { ArticleStatus } from "@/features/article/types";

import { user } from "./auth";
import { category } from "./category";
import { comment } from "./comment";
import { MainSchema, RelationSchema } from "./main";
import { media } from "./media";
import { rate } from "./rate";

export const articleStatus = MainSchema.enum("article_status", [
  "draft",
  "published",
  "archived",
]);

export const article = MainSchema.table("article", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
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
  tags: jsonb("tags")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'`),
  authorId: text("author_id")
    .references(() => user.id)
    .notNull(),
  status: articleStatus("status")
    .notNull()
    .$type<ArticleStatus>()
    .default("draft"),
  readingTime: integer("reading_time"),
  views: integer("vires").default(0).notNull(),
});

export const articleComments = RelationSchema.table(
  "article_comments",
  {
    articleId: uuid("article_id")
      .notNull()
      .references(() => article.id, { onDelete: "cascade" }),
    commentId: uuid("comment_id")
      .notNull()
      .references(() => comment.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.articleId, table.commentId] })],
);

export const articleCategory = RelationSchema.table(
  "article_category",
  {
    articleId: uuid("article_id")
      .references(() => article.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => category.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.articleId, table.categoryId] })],
);

export const articleRate = RelationSchema.table(
  "article_rate",
  {
    articleId: uuid("article_id")
      .references(() => article.id, { onDelete: "cascade" })
      .notNull(),
    rateId: uuid("rate_id")
      .references(() => rate.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.articleId, table.rateId] })],
);

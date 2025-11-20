import { sql } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { user } from "./auth";
import { category } from "./category";
import { comment } from "./comment";
import { media } from "./media";
import { rate } from "./rate";

export const articleStatus = pgEnum("article_status", [
  "draft",
  "published",
  "archived",
]);

export const article = pgTable("article", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  slug: varchar("slug", { length: 255 }).unique(),
  excerpt: text("excerpt").notNull(),
  thumbnail: uuid("thumbnail").references(() => media.id, {
    onDelete: "set null",
  }),
  tags: jsonb("tags")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'`),
  authorId: text("author_id")
    .default("00000000")
    .references(() => user.id, { onDelete: "set default" })
    .notNull(),
  status: articleStatus("status").notNull().default("draft"),
  readingTime: integer("reading_time"),
  views: integer("vires").default(0).notNull(),
});

export const articleComments = pgTable(
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

export const articleCategory = pgTable(
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

export const articleRate = pgTable(
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

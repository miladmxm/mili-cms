import { sql } from "drizzle-orm";
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

import type { ArticleStatus } from "@/services/article/types";
import type { ProseMirror } from "@/types/type";

import { articleCategory } from "./articleCategory";
import { user } from "./auth";
import { comment } from "./comment";
import { MainSchema, RelationSchema } from "./main";
import { media } from "./media";
import { rate } from "./rate";

export const articleStatus = MainSchema.enum("article_status", [
  "draft",
  "published",
  "archived",
]);

export const article = MainSchema.table(
  "article",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
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
  },
  (table) => ({
    slugUnique: uniqueIndex("articles_slug_unique").on(table.slug),
  }),
);

export const articleToComments = RelationSchema.table(
  "article_to_comments",
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

export const articleToCategory = RelationSchema.table(
  "article_to_category",
  {
    articleId: uuid("article_id")
      .references(() => article.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => articleCategory.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.articleId, table.categoryId] })],
);

export const articleToRate = RelationSchema.table(
  "article_to_rate",
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

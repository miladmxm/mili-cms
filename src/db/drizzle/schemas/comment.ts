import type { AnyPgColumn } from "drizzle-orm/pg-core";

import { pgEnum, smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";

import type { Rating } from "@/services/type";

import { user } from "./auth";
import { MainSchema } from "./main";

export const commentStatus = pgEnum("comment_status", [
  "approved",
  "pending",
  "spam",
]);
export const commentTypes = MainSchema.enum("comment_types", ["qa", "default"]);

export const comment = MainSchema.table("comment", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  content: text("content").notNull(),
  status: commentStatus("status").notNull().default("pending"),
  type: commentTypes("type").default("default").notNull(),
  rate: smallint("rate").$type<Rating>(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  parentId: uuid("parent_id").references((): AnyPgColumn => comment.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const mediaTypes = pgEnum("media_types", [
  "image",
  "video",
  "audio",
  "document",
]);

export const media = pgTable("media", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  url: text("url").notNull(),
  type: mediaTypes("type").notNull(),
  size: text("size"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

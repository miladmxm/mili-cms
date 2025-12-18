import { integer, text, timestamp, uuid } from "drizzle-orm/pg-core";

import type { MediaTypes } from "@/features/type";

import { MainSchema } from "./main";

export const mediaTypes = MainSchema.enum("media_types", [
  "image",
  "video",
  "audio",
  "document",
]);

export const media = MainSchema.table("media", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  url: text("url").notNull(),
  type: mediaTypes("type").$type<MediaTypes>().notNull(),
  size: integer("size").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

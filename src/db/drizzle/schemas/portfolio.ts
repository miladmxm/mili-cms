import { text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { MainSchema } from "./main";
import { media } from "./media";

export const portfolio = MainSchema.table("portfolio", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  link: text("link").notNull().default(""),
  description: text("description").notNull().default(""),
  thumbnailId: uuid("thumbnail_id")
    .notNull()
    .references(() => media.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

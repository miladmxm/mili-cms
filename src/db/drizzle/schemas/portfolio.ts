import { text, uuid, varchar } from "drizzle-orm/pg-core";

import { MainSchema } from "./main";
import { media } from "./media";

export const portfolio = MainSchema.table("portfolio", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  link: text("link"),
  description: text("description"),
  thumbnailId: uuid("thumbnail_id")
    .notNull()
    .references(() => media.id, {
      onDelete: "cascade",
    }),
});

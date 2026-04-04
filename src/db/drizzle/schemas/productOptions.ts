import { text, uuid } from "drizzle-orm/pg-core";

import { MainSchema } from "./main";

export const productOption = MainSchema.table("product_option", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

export const productOptionItem = MainSchema.table("product_option_item", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  label: text("name").notNull(),
  value: text("value").notNull(),
  optionId: uuid("option_id")
    .notNull()
    .references(() => productOption.id, { onDelete: "cascade" }),
});

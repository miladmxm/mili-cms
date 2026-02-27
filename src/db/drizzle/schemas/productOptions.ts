import { text, uuid } from "drizzle-orm/pg-core";

import { MainSchema } from "./main";

export const productOption = MainSchema.table("product_option", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

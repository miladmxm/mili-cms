import { pgTable, smallint, text, uuid } from "drizzle-orm/pg-core";

import { user } from "./auth";

export const rate = pgTable("rate", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  ratign: smallint("rating").notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  viewerId: text("viewr_id").notNull(),
});

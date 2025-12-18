import { smallint, text, uuid } from "drizzle-orm/pg-core";

import { user } from "./auth";
import { MainSchema } from "./main";

export const rate = MainSchema.table("rate", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  ratign: smallint("rating").notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  viewerId: text("viewr_id").notNull(),
});

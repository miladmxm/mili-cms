import { text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { user } from "./auth";
import { MainSchema } from "./main";

export const address = MainSchema.table("adress", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  fullname: varchar("fullname").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  postCode: varchar("post_code").notNull(),
  province: varchar("province").notNull(),
  city: varchar("city").notNull(),
  additionalAddress: text("additional_address").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

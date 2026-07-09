import { integer, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { user } from "./auth";
import { MainSchema } from "./main";
import { product, productMeta } from "./product";

export const cart = MainSchema.table("cart", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const cartItem = MainSchema.table("cart_item", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  cartId: uuid("cart_id")
    .notNull()
    .references(() => cart.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  metadataId: uuid("metadata_id")
    .notNull()
    .references(() => productMeta.id, {
      onDelete: "cascade",
    }),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

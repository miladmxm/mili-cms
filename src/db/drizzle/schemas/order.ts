import { integer, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import type { OrderStatus } from "@/services/shipping/type";

import { address } from "./address";
import { user } from "./auth";
import { CurrencyEnum, MainSchema } from "./main";
import { product, productMeta } from "./product";

export const orderStatuses = [
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export const order = MainSchema.table("order", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  addressId: uuid("address_id")
    .notNull()
    .references(() => address.id, { onDelete: "cascade" }),
  status: text("status", { enum: orderStatuses })
    .notNull()
    .$type<OrderStatus>()
    .default("pending"),
  totalPrice: integer("total_price").notNull().default(0),
  currency: CurrencyEnum("currency").default("IRR").notNull(),
  sendingMethod: varchar("sending_method", { length: 50 }).notNull(),
  paymentGateway: varchar("payment_gateway", { length: 50 }).notNull(),
  paymentRef: varchar("payment_ref", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const orderItem = MainSchema.table("order_item", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  metadataId: uuid("metadata_id")
    .notNull()
    .references(() => productMeta.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: integer("unit_price").notNull().default(0),
  discount: integer("discount").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

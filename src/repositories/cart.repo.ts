import { and, eq, exists, sql } from "drizzle-orm";

import { cart, cartItem } from "@/db/drizzle/schemas";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const findCartByUserIdWithProductAndMetadata = async (
  userId: string,
  tx?: Transaction,
) => {
  const userCart = await getDBorTX(tx).query.cart.findFirst({
    where: eq(cart.userId, userId),
    with: {
      items: {
        with: {
          product: {
            columns: { id: true, name: true, slug: true },
            with: { thumbnail: true },
          },
          metadata: {
            columns: {
              id: true,
              price: true,
              stock: true,
              discount: true,
              optionItemIds: true,
            },
          },
        },
        orderBy: (items, { desc }) => [desc(items.createdAt)],
      },
    },
  });
  return userCart;
};

export const findCartItemByProduct = async (
  {
    cartId,
    metadataId,
    userId,
    productId,
  }: {
    cartId: string;
    userId: string;
    productId: string;
    metadataId: string | null;
  },
  tx?: Transaction,
) => {
  const conditions = [
    eq(cartItem.cartId, cartId),
    eq(cartItem.productId, productId),
  ];

  if (metadataId) {
    conditions.push(eq(cartItem.metadataId, metadataId));
  } else {
    conditions.push(sql`${cartItem.metadataId} IS NULL`);
  }

  conditions.push(
    exists(
      getDBorTX(tx)
        .select()
        .from(cart)
        .where(and(eq(cart.userId, userId), eq(cartItem.cartId, cart.id)))
        .limit(1),
    ),
  );
  return getDBorTX(tx).query.cartItem.findFirst({
    where: and(...conditions),
  });
};

export const createCart = (userId: string, tx?: Transaction) =>
  getDBorTX(tx).insert(cart).values({ userId }).returning({ id: cart.id });

export const createCartItem = (
  data: typeof cartItem.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(cartItem).values(data).returning({ id: cartItem.id });

export const updateCartItemQuantity = (
  {
    id,
    quantity,
    userId,
  }: {
    id: string;
    quantity: number;
    userId: string;
  },
  tx?: Transaction,
) => {
  const conditions = [eq(cartItem.id, id)];

  conditions.push(
    exists(
      getDBorTX(tx)
        .select()
        .from(cart)
        .where(and(eq(cart.userId, userId), eq(cartItem.cartId, cart.id)))
        .limit(1),
    ),
  );
  return getDBorTX(tx)
    .update(cartItem)
    .set({ quantity })
    .where(and(...conditions))
    .returning({ id: cartItem.id });
};

export const deleteCartItem = (
  { id, userId }: { id: string; userId: string },
  tx?: Transaction,
) => {
  const conditions = [eq(cartItem.id, id)];

  conditions.push(
    exists(
      getDBorTX(tx)
        .select()
        .from(cart)
        .where(and(eq(cart.userId, userId), eq(cartItem.cartId, cart.id)))
        .limit(1),
    ),
  );
  return getDBorTX(tx)
    .delete(cartItem)
    .where(and(...conditions));
};

export const deleteAllCartItems = (
  { cartId, userId }: { cartId: string; userId: string },
  tx?: Transaction,
) => {
  const conditions = [eq(cartItem.cartId, cartId)];
  conditions.push(
    exists(
      getDBorTX(tx)
        .select()
        .from(cart)
        .where(and(eq(cart.userId, userId), eq(cartItem.cartId, cart.id)))
        .limit(1),
    ),
  );
  return getDBorTX(tx)
    .delete(cartItem)
    .where(and(...conditions));
};

export const findCartItemById = (
  { id, userId }: { id: string; userId: string },
  tx?: Transaction,
) => {
  const conditions = [eq(cartItem.id, id)];

  conditions.push(
    exists(
      getDBorTX(tx)
        .select()
        .from(cart)
        .where(and(eq(cart.userId, userId), eq(cartItem.cartId, cart.id)))
        .limit(1),
    ),
  );
  return getDBorTX(tx).query.cartItem.findFirst({
    where: and(...conditions),
    with: {
      product: {
        columns: { id: true, name: true, slug: true },
        with: { thumbnail: true },
      },
      metadata: {
        columns: {
          id: true,
          price: true,
          stock: true,
          discount: true,
          optionItemIds: true,
        },
      },
    },
  });
};

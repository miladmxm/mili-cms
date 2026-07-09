import { cacheTag } from "next/cache";
import "server-only";

import { CacheKeys } from "@/constant/cacheKeys";
import { withTransaction } from "@/repositories";
import * as cartRepo from "@/repositories/cart.repo";
import { dtoProductVariables } from "@/repositories/product.repo";
import { DTOconvertMediaPathToRealUrl } from "@/services/media/dto";

import type {
  AddToCartPayload,
  Cart,
  CartItem,
  UpdateCartItemPayload,
} from "./type";

export const getCart = async (userId: string): Promise<Cart | undefined> => {
  "use cache";

  cacheTag(`${CacheKeys.cart}-${userId}`);

  const userCart =
    await cartRepo.findCartByUserIdWithProductAndMetadata(userId);
  if (!userCart) return undefined;
  const userCardItems = userCart.items.filter(
    ({ product, metadata }) => Boolean(product) || Boolean(metadata),
  );

  const items: CartItem[] = userCardItems.map((item) => ({
    ...item,
    metadata: {
      ...item.metadata,
      thumbnail: item.metadata.thumbnail
        ? {
            ...item.metadata.thumbnail,
            url: DTOconvertMediaPathToRealUrl(item.metadata.thumbnail.url),
          }
        : null,
    },
    product: {
      ...item.product,
      variables: dtoProductVariables(item.product.variables),
      thumbnail: item.product.thumbnail
        ? {
            ...item.product.thumbnail,
            url: DTOconvertMediaPathToRealUrl(item.product.thumbnail.url),
          }
        : null,
    },
  }));

  return {
    ...userCart,
    items,
  };
};

export const addToCart = async ({
  productId,
  quantity,
  userId,
  metadataId,
}: AddToCartPayload) => {
  const id = await withTransaction(async (tx) => {
    let userCart = await cartRepo.findCartByUserId(userId, tx);

    if (!userCart) {
      const [newCart] = await cartRepo.createCart(userId, tx);
      userCart = { id: newCart.id } as unknown as typeof userCart;
    }

    const existingItem = await cartRepo.findCartItemByProduct(
      {
        cartId: userCart!.id,
        productId,
        metadataId,
      },
      tx,
    );
    let resultId: string;

    if (existingItem) {
      resultId = (
        await cartRepo.updateCartItemQuantity(
          {
            id: existingItem.id,
            quantity: existingItem.quantity + quantity,
            userId,
          },
          tx,
        )
      )[0]?.id;
    } else {
      resultId = (
        await cartRepo.createCartItem(
          {
            cartId: userCart!.id,
            productId,
            metadataId,
            quantity,
          },
          tx,
        )
      )[0]?.id;
    }

    return resultId;
  });
  return id;
};

export const removeFromCart = async ({
  itemId,
  userId,
}: {
  userId: string;
  itemId: string;
}) => {
  return withTransaction(async (tx) => {
    await cartRepo.deleteCartItem({ id: itemId, userId }, tx);
  });
};

export const updateCartItem = async ({
  itemId,
  quantity,
  userId,
}: UpdateCartItemPayload) => {
  if (quantity <= 0) {
    await removeFromCart({ itemId, userId });
    return;
  }

  return withTransaction(async (tx) => {
    await cartRepo.updateCartItemQuantity(
      {
        id: itemId,
        quantity,
        userId,
      },
      tx,
    );
  });
};

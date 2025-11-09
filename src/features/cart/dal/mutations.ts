import "server-only";

import { dalOperation } from "@/dal/helpers";
import { getGuestCartToken } from "@/lib/auth";
import { POST } from "@/utils/fetcher";

import type { AddToCart } from "../types/cart";

import { WC_ADD_TO_CART_STORE } from "./utils";

export const addToCart = async ({ id, quantity, variation }: AddToCart) => {
  const cartTockn = await getGuestCartToken();
  const url = WC_ADD_TO_CART_STORE();

  return dalOperation(() => {
    return POST(
      url,
      { id, quantity, variation },
      {
        headers: {
          "Cart-Token": cartTockn,
        },
      },
    );
  });
};

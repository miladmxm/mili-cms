"use server";

import { addToCartByProductId } from "../dal/mutations";

export const addToCart = async (id: number | string) => {
  await addToCartByProductId(id);
};

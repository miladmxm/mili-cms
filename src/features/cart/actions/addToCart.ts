"use server";

import * as cartMutations from "../dal/mutations";

export const addToCart = async (id: number) => {
  const res = await cartMutations.addToCart({ id, quantity: 1, variation: [] });
  console.log(res);
};

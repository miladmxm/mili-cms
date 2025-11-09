import { cacheTag } from "next/cache";

import { WC_CART_STORE } from "./utils";

export const getCartToken = async (cacheId: string) => {
  "use cache";
  cacheTag(`cart-token-${cacheId}`);
  const toketRes = await fetch(WC_CART_STORE(), {
    headers: {
      "Cart-Token": "12345",
    },
  });
  return toketRes.headers.get("Cart-Token") as string;
};

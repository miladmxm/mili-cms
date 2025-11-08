import "server-only";

import { getCartToken, getNonce } from "./queries";

let i = 0;
export const addToCartByProductId = async (id: number | string) => {
  console.log("from server", id);
  console.log(await getNonce());
  console.log(await getCartToken(String(i % 4)));
  i++;
};

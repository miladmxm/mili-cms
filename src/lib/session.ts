import "server-only";

import { setCookieSecret } from "./cookies";

export const addCartTokenToSession = async (cartToken: string) => {
  await setCookieSecret("cart_token", cartToken);
};

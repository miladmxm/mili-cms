import "server-only";

import { getCartToken } from "@/features/cart/dal/queries";

import { getCookie, setCookieSecret } from "./cookies";

export const isLoggedIn = async () => {
  const token = await getCookie("auth-token");
  return !!token;
};
export const setSessionId = async () => {
  await setCookieSecret("session-id", crypto.randomUUID());
};

export const getSessionId = async (): Promise<string> => {
  const sessionId = await getCookie("session-id");
  //   Handle it in proxy file
  return sessionId as string;
};

const generateCartTokenBySessionId = async (): Promise<string> => {
  const cartToken = await getCartToken(await getSessionId());

  setCookieSecret("cart-token", cartToken);
  return cartToken;
};

export const getGuestCartToken = async (): Promise<string> => {
  const cartToken = await getCookie("cart-token");
  if (cartToken) return cartToken;
  return generateCartTokenBySessionId();
};

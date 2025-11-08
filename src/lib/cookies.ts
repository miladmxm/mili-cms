import "server-only";
import { cookies } from "next/headers";

import { isProduction } from "@/config/env";

export const setCookieSecret = async (name: string, value: string) => {
  const cookieStore = await cookies();
  const isProd = isProduction();
  cookieStore.set(name, value, {
    httpOnly: isProd,
    secure: isProd,
    sameSite: isProd ? "lax" : "strict",
  });
};

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export const setCookie = async (name: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value);
};

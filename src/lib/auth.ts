import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { headers } from "next/headers";
import "server-only";

import { db } from "@/db/drizzle/db";

import type { Permissions } from "./permisions";

import { ac, roles } from "./permisions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  session: {
    disableSessionRefresh: true,
  },
  emailAndPassword: {
    enabled: true,
  },
  onAPIError: {
    throw: true,
  },
  plugins: [
    nextCookies(),
    admin({
      ac,
      roles,
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
  ],
});

export const getSession = async () =>
  auth.api.getSession({ headers: await headers() });

export const hasAccess = async (
  userId: (typeof auth.$Infer)["Session"]["user"]["id"],
  permissions: Partial<Permissions>,
) => {
  try {
    return await auth.api.userHasPermission({
      body: {
        userId,
        permissions,
      },
    });
  } catch (error) {
    // ! error for validation body
    console.log("body error", error);
    return { success: true };
  }
};

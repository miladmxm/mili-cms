import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import "server-only";

import { db } from "@/db/drizzle/db";

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

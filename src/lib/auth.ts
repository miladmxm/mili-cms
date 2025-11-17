import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

import { db } from "@/db/drizzle/db";

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
  plugins: [admin()],
});

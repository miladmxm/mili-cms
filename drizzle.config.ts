import { defineConfig } from "drizzle-kit";

import env from "@/config/env";

export default defineConfig({
  out: "./src/db/drizzle/migrations",
  schema: "./src/db/drizzle/schemas.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL,
  },
  migrations: {
    schema: env.DB_NAME,
  },
});

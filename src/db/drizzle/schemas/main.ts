import { pgSchema } from "drizzle-orm/pg-core";

import env from "@/config/env";

export const MainSchema = pgSchema(env.DB_NAME);

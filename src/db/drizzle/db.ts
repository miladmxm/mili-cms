import { drizzle } from "drizzle-orm/node-postgres";

import env from "@/config/env.js";

import * as schema from "./schemas";

export const db = drizzle(env.DB_URL, { schema });

import { pgSchema } from "drizzle-orm/pg-core";

import env from "@/config/env";
import { CURRENCY } from "@/constant/appData";

export const MainSchema = pgSchema(env.DB_NAME);
export const RelationSchema = pgSchema("relations");

export const CurrencyEnum = MainSchema.enum("currency", CURRENCY);

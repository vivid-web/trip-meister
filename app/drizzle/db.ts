import { env } from "@/lib/server/env";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

import * as schema from "./schema";

const client = new Database(env.DATABASE_PATH);

export const db = drizzle(client, {
	casing: "snake_case",
	schema,
});

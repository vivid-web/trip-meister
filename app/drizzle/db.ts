import { env } from "@/lib/server/env";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

export const db = drizzle({
	casing: "snake_case",
	connection: {
		authToken: env.TURSO_AUTH_TOKEN,
		syncInterval: 60,
		syncUrl: env.TURSO_DATABASE_URL,
		url: "file:./data/local.db",
	},
	schema,
});

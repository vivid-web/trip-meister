import { env } from "@/lib/server/env";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle({
	casing: "snake_case",
	connection: {
		authToken: env.TURSO_AUTH_TOKEN,
		url: env.TURSO_DATABASE_URL,
	},
});

import { defineConfig } from "drizzle-kit";

export default defineConfig({
	casing: "snake_case",
	dbCredentials: {
		authToken: process.env.TURSO_AUTH_TOKEN || undefined,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		url: process.env.TURSO_DATABASE_URL!,
	},
	dialect: "turso",
	out: "./app/drizzle/migrations",
});

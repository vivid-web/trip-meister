import { defineConfig } from "drizzle-kit";

const DATABASE_PATH = process.env.DATABASE_PATH || "./data/local.db";

export default defineConfig({
	casing: "snake_case",
	dbCredentials: {
		url: DATABASE_PATH,
	},
	dialect: "sqlite",
	out: "./app/drizzle/migrations",
});

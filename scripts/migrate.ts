import { db } from "@/drizzle/db";
import { migrate as baseMigrate } from "drizzle-orm/bun-sqlite/migrator";

function migrate() {
	console.log("🔄️ Migrating database...");

	console.time("🗄️ Running DB migrations...");
	baseMigrate(db, {
		migrationsFolder: "./app/drizzle/migrations",
	});
	console.timeEnd("🗄️ Running DB migrations...");

	console.log("🏁 Finished migrating!");
}

try {
	migrate();
} catch (e) {
	console.error(e);
	process.exit(1);
} finally {
	db.$client.close();
}

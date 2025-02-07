import { db } from "@/drizzle/db";
import { migrate as baseMigrate } from "drizzle-orm/libsql/migrator";

async function migrate() {
	console.log("🔄️ Migrating database...");

	console.time("🗄️ Running DB migrations...");
	await baseMigrate(db, {
		migrationsFolder: "./app/drizzle/migrations",
	});
	console.timeEnd("🗄️ Running DB migrations...");

	console.log("🏁 Finished migrating!");
}

try {
	await migrate();
} catch (e) {
	console.error(e);
	process.exit(1);
} finally {
	db.$client.close();
}

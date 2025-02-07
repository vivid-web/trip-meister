import { db } from "@/drizzle/db";

function seed() {
	console.log("🌱 Seeding...");
	console.time(`🌱 Database has been seeded`);

	console.time("🧹 Cleaned up the database...");
	console.timeEnd("🧹 Cleaned up the database...");

	console.timeEnd(`🌱 Database has been seeded`);
}

try {
	seed();
} catch (e) {
	console.error(e);
	process.exit(1);
} finally {
	db.$client.close();
}

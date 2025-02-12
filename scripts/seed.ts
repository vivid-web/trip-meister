import { db } from "@/drizzle/db";
import { account, session, user, verification } from "@/drizzle/schema";

async function seed() {
	console.log("🌱 Seeding...");
	console.time(`🌱 Database has been seeded`);

	console.time("🧹 Cleaned up the database...");
	await db.delete(verification).all();
	await db.delete(session).all();
	await db.delete(account).all();
	await db.delete(user).all();
	console.timeEnd("🧹 Cleaned up the database...");

	console.timeEnd(`🌱 Database has been seeded`);
}

try {
	await seed();
} catch (e) {
	console.error(e);
	process.exit(1);
} finally {
	db.$client.close();
}

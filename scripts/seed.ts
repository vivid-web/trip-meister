import { db } from "@/drizzle/db";
import { account, session, user, verification } from "@/drizzle/schema";

function seed() {
	console.log("🌱 Seeding...");
	console.time(`🌱 Database has been seeded`);

	console.time("🧹 Cleaned up the database...");
	db.delete(verification).all();
	db.delete(session).all();
	db.delete(account).all();
	db.delete(user).all();
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

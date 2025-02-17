import { db } from "@/drizzle/db";
import { authMiddleware } from "@/lib/server/middleware";
import { createServerFn } from "@tanstack/start";

export const getAllTripsQuery = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return await db.query.trip.findMany({
			columns: {
				endDate: true,
				endMileage: true,
				id: true,
				name: true,
				startDate: true,
				startMileage: true,
			},
			orderBy: (trips, { desc }) => desc(trips.startDate),
			where: (trips, { eq }) => eq(trips.userId, context.user.id),
		});
	});

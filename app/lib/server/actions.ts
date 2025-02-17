import { db } from "@/drizzle/db";
import { trip } from "@/drizzle/schema";
import { authMiddleware } from "@/lib/server/middleware";
import { CreateTripSchema } from "@/lib/shared/schemas";
import { createServerFn } from "@tanstack/start";

export const createTripAction = createServerFn({ method: "POST" })
	.validator(CreateTripSchema)
	.middleware([authMiddleware])
	.handler(async ({ context, data }) => {
		await db.insert(trip).values({
			...data,
			userId: context.user.id,
		});
	});

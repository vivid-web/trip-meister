import { user } from "@/drizzle/schema/auth";
import { sqliteTable } from "drizzle-orm/sqlite-core";

/* eslint-disable perfectionist/sort-objects */
export const trip = sqliteTable("trip", (t) => ({
	id: t.integer().primaryKey(),

	name: t.text().notNull(),
	startDate: t.integer({ mode: "timestamp" }).notNull(),
	startMileage: t.integer().notNull(),

	endDate: t.integer({ mode: "timestamp" }),
	endMileage: t.integer(),

	createdAt: t
		.integer({ mode: "timestamp" })
		.notNull()
		.$default(() => new Date()),
	updatedAt: t
		.integer({ mode: "timestamp" })
		.notNull()
		.$default(() => new Date()),

	userId: t
		.text()
		.notNull()
		.references(() => user.id, {
			onUpdate: "cascade",
			onDelete: "cascade",
		}),
}));
/* eslint-enable perfectionist/sort-objects */

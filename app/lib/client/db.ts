import { createSync, Syncable } from "@/lib/client/sync-database.client";
import { Dexie, type EntityTable } from "dexie";

export type Trip = Syncable<{
	endDate?: Date;
	endMileage?: number;
	id: number;
	name: string;
	startDate: Date;
	startMileage: number;
}>;

export const db = new Dexie("TripMeister") as Dexie & {
	trips: EntityTable<Trip, "id">;
};

db.version(1).stores({
	trips:
		"++id, name, startMileage, endMileage, startDate, endDate, $created, $deleted, $updated, $synced",
});

const sync = createSync();

sync.add(db.trips, {
	onPull: () => {
		console.log("onPull");
	},
	onPush: () => {
		console.log("onPush");
	},
});

import { createSync, Syncable } from "@/lib/client/sync-database.client";
import pkg, { type Dexie as DexieType, type EntityTable } from "dexie";

// @ts-expect-error Dexie isn't exported correctly
const { Dexie } = pkg;

export type Trip = Syncable<{
	endDate?: Date;
	endMileage?: number;
	id: number;
	name: string;
	startDate: Date;
	startMileage: number;
}>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const db = new Dexie("TripMeister") as DexieType & {
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

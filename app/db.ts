import Dexie, { EntityTable } from "dexie";

export type Trip = {
	endDate?: Date;
	endMileage?: number;
	id: number;
	name: string;
	startDate: Date;
	startMileage: number;
};

export const db = new Dexie("TripMeister") as Dexie & {
	trips: EntityTable<Trip, "id">;
};

db.version(1).stores({
	trips: "++id, name, startMileage, endMileage, startDate, endDate",
});

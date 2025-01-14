import Dexie, { EntityTable } from "dexie";

export type Trip = {
	id: number;
	name: string;
	startDate: Date;
	startMileage: number;
	endDate?: Date;
	endMileage?: number;
};

export const db = new Dexie("TripMeister") as Dexie & {
	trips: EntityTable<Trip, "id">;
};

db.version(1).stores({
	trips: "++id, name, startMileage, endMileage, startDate, endDate",
});

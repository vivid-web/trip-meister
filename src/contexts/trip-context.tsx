import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
} from "react";
import { db, Trip } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";

type StartTripPayload = {
	name: string;
	startMileage: number;
};

type FinishTripPayload = {
	endMileage: number;
	endDate?: Date;
};

type EditTripPayload = {
	startDate: Date;
	name: string;
	startMileage: number;
	endDate?: Date;
	endMileage?: number;
};

type ContextType = {
	startTrip: (payload: StartTripPayload) => Promise<void>;
	finishTrip: (id: number, payload: FinishTripPayload) => Promise<void>;
	editTrip: (id: number, payload: EditTripPayload) => Promise<void>;
	trips: Array<Trip>;
};

export const TripContext = createContext<undefined | ContextType>(undefined);

export function TripProvider({ children }: PropsWithChildren) {
	const trips = useLiveQuery(
		() => db.trips.orderBy("startDate").reverse().toArray(),
		[],
		[],
	);

	const startTrip = useCallback(async (payload: StartTripPayload) => {
		await db.trips.add({
			name: payload.name,
			startDate: new Date(),
			startMileage: payload.startMileage,
		});
	}, []);

	const finishTrip = useCallback(
		async (id: number, payload: FinishTripPayload) => {
			await db.trips.update(id, payload);
		},
		[],
	);

	const editTrip = useCallback(async (id: number, payload: EditTripPayload) => {
		await db.trips.update(id, payload);
	}, []);

	const value = useMemo(
		() => ({ trips, startTrip, finishTrip, editTrip }),
		[trips, startTrip, finishTrip, editTrip],
	);

	return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export const useTrip = () => {
	const context = useContext(TripContext);

	if (!context) {
		throw new Error("useTrip must be used within a TripProvider");
	}

	return context;
};

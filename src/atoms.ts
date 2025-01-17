import { atomWithStorage } from "jotai/utils";
import { DISTANCE_UNITS_KEY, DistanceUnit, KILOMETERS } from "@/constants";

export const distanceUnitsAtom = atomWithStorage<DistanceUnit>(
	DISTANCE_UNITS_KEY,
	KILOMETERS,
);

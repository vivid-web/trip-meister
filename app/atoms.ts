import { DISTANCE_UNITS_KEY, DistanceUnit, KILOMETERS } from "@/constants";
import { atomWithStorage } from "jotai/utils";

export const distanceUnitsAtom = atomWithStorage<DistanceUnit>(
	DISTANCE_UNITS_KEY,
	KILOMETERS,
);

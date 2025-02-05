import {
	DISTANCE_UNITS_KEY,
	DistanceUnit,
	KILOMETERS,
} from "@/lib/shared/constants";
import { atomWithStorage } from "jotai/utils";

export const distanceUnitsAtom = atomWithStorage<DistanceUnit>(
	DISTANCE_UNITS_KEY,
	KILOMETERS,
);

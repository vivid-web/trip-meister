export const DISTANCE_UNITS_KEY = "trip-meister::distance-units";

export const MILES = "mi";

export const KILOMETERS = "km";

export const DISTANCE_UNITS = [MILES, KILOMETERS] as const;

export type Miles = typeof MILES;

export type KiloMeters = typeof KILOMETERS;

export type DistanceUnit = Miles | KiloMeters;

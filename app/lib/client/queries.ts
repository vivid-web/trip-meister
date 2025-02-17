import { getAllTripsQuery as getAllTrips } from "@/lib/server/queries";
import { queryOptions } from "@tanstack/react-query";

export const getAllTripsQuery = () =>
	queryOptions({
		queryFn: () => getAllTrips(),
		queryKey: ["trips", "all"],
	});

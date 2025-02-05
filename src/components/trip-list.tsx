import { TripCard } from "@/components/trip-card";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db.ts";

export function TripList() {
	const trips = useLiveQuery(
		() => db.trips.orderBy("startDate").reverse().toArray(),
		[],
		[],
	);

	return (
		<div className="space-y-4">
			<h2 className="mb-4 text-xl font-semibold">Your Trips</h2>
			{trips.length === 0 ? (
				<p className="py-4 text-center text-gray-500">No trips recorded yet.</p>
			) : (
				<div className="space-y-4">
					{trips.map((trip) => (
						<TripCard {...trip} key={trip.id} />
					))}
				</div>
			)}
		</div>
	);
}

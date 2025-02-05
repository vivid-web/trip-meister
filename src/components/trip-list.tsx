import { TripCard } from "@/components/trip-card";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db.ts";
import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
	return (
		<div className="space-y-4">
			<h2 className="mb-4 text-xl font-semibold">Your Trips</h2>
			{children}
		</div>
	);
}

export function TripList() {
	const trips = useLiveQuery(() =>
		db.trips.orderBy("startDate").reverse().toArray(),
	);

	if (!trips) {
		return (
			<Layout>
				<p className="rounded border border-dashed border-gray-300 py-4 text-center text-gray-400">
					Loading trips...
				</p>
			</Layout>
		);
	}

	if (trips.length === 0) {
		return (
			<Layout>
				<p className="rounded border border-dashed border-gray-300 py-4 text-center text-gray-400">
					No trips recorded yet.
				</p>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="space-y-4">
				{trips.map((trip) => (
					<TripCard {...trip} key={trip.id} />
				))}
			</div>
		</Layout>
	);
}

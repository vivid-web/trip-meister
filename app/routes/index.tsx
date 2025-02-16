import { NewTripCard } from "@/components/new-trip-card";
import { TripList } from "@/components/trip-list";
import { Toaster } from "@/components/ui/sonner";
import { db } from "@/drizzle/db";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { CarIcon } from "lucide-react";

const getFoo = createServerFn().handler(async () => {
	const users = await db.query.user.findMany();

	console.log(users);

	return users;
});

export const Route = createFileRoute("/")({
	component: RouteComponent,
	loader: async () => {
		const users = await getFoo();

		return { users };
	},
});

function RouteComponent() {
	return (
		<div className="min-h-screen bg-gray-100">
			<div className="mx-auto max-w-4xl px-4 py-8">
				<header className="mb-8 text-center">
					<div className="mb-4 flex items-center justify-center">
						<CarIcon className="text-primary h-10 w-10" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900">TripMeister</h1>
					<p className="mt-2 text-gray-600">Keep track of your trips</p>
				</header>

				<div className="grid gap-8 md:grid-cols-[350px,1fr]">
					<NewTripCard />
					<TripList />
				</div>
			</div>
			<Toaster />
		</div>
	);
}

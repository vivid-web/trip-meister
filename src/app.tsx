import { NewTripCard } from "@/components/new-trip-card";
import { TripList } from "@/components/trip-list";
import { Toaster } from "@/components/ui/sonner";
import { CarIcon } from "lucide-react";

export function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<div className="mx-auto max-w-4xl px-4 py-8">
				<header className="mb-8 text-center">
					<div className="mb-4 flex items-center justify-center">
						<CarIcon className="h-10 w-10 text-primary" />
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

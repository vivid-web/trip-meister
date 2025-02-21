import { AccountSection } from "@/components/account-section";
import { NewTripCard } from "@/components/new-trip-card";
import { TripList } from "@/components/trip-list";
import { Toaster } from "@/components/ui/sonner";
import { createFileRoute } from "@tanstack/react-router";
import { CarIcon } from "lucide-react";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen bg-gray-100">
			<div className="p-4">
				<header className="grid md:grid-cols-12">
					<div className="col-span-8 col-start-3">
						<div className="my-8 mt-4 text-center">
							<div className="mb-4 flex items-center justify-center">
								<CarIcon className="text-primary h-10 w-10" />
							</div>
							<h1 className="text-3xl font-bold text-gray-900">TripMeister</h1>
							<p className="mt-2 text-gray-600">Keep track of your trips</p>
						</div>
					</div>
					<AccountSection className="col-span-2"></AccountSection>
				</header>
				<div className="grid md:grid-cols-12">
					<div className="col-span-8 col-start-3 grid gap-8 md:grid-cols-[350px,1fr]">
						<NewTripCard />
						<TripList />
					</div>
				</div>
				<Toaster />
			</div>
		</div>
	);
}

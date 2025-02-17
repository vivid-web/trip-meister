import { AccountSection } from "@/components/account-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useZodForm } from "@/hooks/use-zod-form";
import { distanceUnitsAtom } from "@/lib/client/atoms";
import { Trip } from "@/lib/client/db";
import { getAllTripsQuery } from "@/lib/client/queries";
import { createTripAction } from "@/lib/server/actions";
import { CreateTripSchema } from "@/lib/shared/schemas";
import { formatDate, formatDistance } from "@/lib/shared/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai/index";
import {
	CalendarIcon,
	CarIcon,
	EllipsisVerticalIcon,
	PlusCircle,
} from "lucide-react";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";

export function TripCard(props: Trip) {
	const { endDate, endMileage, name, startDate, startMileage } = props;

	const [distanceUnits] = useAtom(distanceUnitsAtom);

	return (
		<Card className="border-l-primary border-l-4">
			<CardHeader className="flex flex-row content-center items-center">
				<CardTitle className="flex flex-1">{name}</CardTitle>
				<div className="flex flex-row gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button aria-haspopup="true" size="icon" variant="ghost">
								<EllipsisVerticalIcon className="h-4 w-4" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuGroup></DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-1">
				<div className="flex items-center text-gray-600">
					<CalendarIcon className="mr-1 h-4 w-4" />
					<span>{formatDate(startDate)}</span>
					{endDate && (
						<span className="flex flex-row gap-2">
							<span>→</span>
							<span>{formatDate(endDate)}</span>
						</span>
					)}
				</div>
				{(startMileage || endMileage) && (
					<p className="text-sm text-gray-600">
						Mileage: {formatDistance(startMileage, distanceUnits)}
						{endMileage && ` → ${formatDistance(endMileage, distanceUnits)}`}
						{startMileage && endMileage && (
							<span className="text-primary ml-2">
								({formatDistance(endMileage - startMileage, distanceUnits)})
							</span>
						)}
					</p>
				)}
			</CardContent>
		</Card>
	);
}

function Layout({ children }: PropsWithChildren) {
	return (
		<div className="space-y-4">
			<h2 className="mb-4 text-xl font-semibold">Your Trips</h2>
			{children}
		</div>
	);
}

function TripList() {
	const { data, isError, isPending } = useQuery(getAllTripsQuery());

	if (isPending) {
		return (
			<Layout>
				<p className="rounded border border-dashed border-gray-300 py-4 text-center text-gray-400">
					Loading trips...
				</p>
			</Layout>
		);
	}

	if (isError) {
		return (
			<Layout>
				<p className="rounded border border-dashed border-red-300 py-4 text-center text-red-400">
					Failed to fetch trips...
				</p>
			</Layout>
		);
	}

	if (data.length === 0) {
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
				{data.map((trip) => (
					<TripCard {...trip} key={trip.id} />
				))}
			</div>
		</Layout>
	);
}

function NewTripCard() {
	const client = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (data: z.infer<typeof CreateTripSchema>) => {
			await createTripAction({ data });
		},
		onSuccess: async () => {
			await client.invalidateQueries(getAllTripsQuery());
		},
	});

	const form = useZodForm({
		defaultValues: {
			name: "",
		},
		schema: CreateTripSchema,
	});

	const onSubmit = form.handleSubmit((data) => {
		mutation.mutate(data);

		form.setFocus("name");
		form.reset();

		toast.success("Trip has been started");
	});

	useEffect(() => {
		form.setFocus("name");
	}, [form, form.setFocus]);

	return (
		<Card>
			<CardHeader className="flex flex-row content-center items-center">
				<CardTitle className="flex flex-1">Start New Trip</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className="flex flex-col gap-4"
						onSubmit={(e) => {
							void onSubmit(e);
						}}
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Trip name</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g., Summer Vacation"
											type="text"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="startMileage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Start Mileage</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter start mileage"
											step="0.1"
											type="number"
											value={field.value || ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit">
							<PlusCircle className="h-5 w-5" />
							Start New Trip
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export const Route = createFileRoute("/server-side")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(getAllTripsQuery());
	},
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

import { distanceUnitsAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { DateInput, Input } from "@/components/ui/input";
import { db, Trip } from "@/db";
import { EndDateSchema, EndMileageSchema } from "@/lib/schemas";
import { formatDate, formatDistance, useZodForm } from "@/lib/utils";
import { useAtom } from "jotai/index";
import { PropsWithChildren } from "react";
import { toast } from "sonner";
import { z } from "zod";

export function FinishTripDialog({
	children,
	id,
	startDate,
	startMileage,
}: PropsWithChildren<Trip>) {
	const [distanceUnits] = useAtom(distanceUnitsAtom);

	const schema = z.object({
		endDate: EndDateSchema.min(
			startDate,
			`The end date must be after ${formatDate(startDate)}`,
		),
		endMileage: EndMileageSchema.min(
			startMileage,
			`The end mileage must equal be greater than ${formatDistance(startMileage, distanceUnits)}`,
		),
	});

	const form = useZodForm({
		defaultValues: {
			endDate: new Date(),
		},
		schema,
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await db.trips.update(id, data);

		form.reset();

		toast.success("Trip has been saved");
	});

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Finish Trip</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						className="flex flex-col gap-4"
						onSubmit={(e) => {
							void onSubmit(e);
						}}
					>
						<FormField
							control={form.control}
							name="endDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>End Date and Time</FormLabel>
									<FormControl>
										<DateInput
											dateFormat="MM/dd/yyyy h:mm aa"
											onChange={field.onChange}
											selected={field.value}
											showTimeInput
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="endMileage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>End Mileage</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter end mileage"
											step="0.1"
											type="number"
											value={field.value || ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Finish Trip</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

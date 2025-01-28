import { PropsWithChildren } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { formatDate, formatDistance, useZodForm } from "@/lib/utils";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { DateInput, Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db, Trip } from "@/db";
import { toast } from "sonner";
import { useAtom } from "jotai/index";
import { distanceUnitsAtom } from "@/atoms";

const EndDateSchema = z.coerce.date({
	message: "The end date must be a valid date",
	required_error: "The end date is required",
	invalid_type_error: "The end date must be a valid date",
});

const EndMileageSchema = z.coerce
	.number({ message: "The end mileage is required" })
	.min(0, "The end mileage must be greater than 0");

export function FinishTripDialog({
	children,
	id,
	startMileage,
	startDate,
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
		schema,
		defaultValues: {
			endDate: new Date(),
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await db.trips.update(id, data);

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
					<form className="flex flex-col gap-4" onSubmit={onSubmit}>
						<FormField
							control={form.control}
							name="endDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>End Date and Time</FormLabel>
									<FormControl>
										<DateInput
											selected={field.value}
											onChange={field.onChange}
											showTimeInput
											dateFormat="MM/dd/yyyy h:mm aa"
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
											value={field.value ?? ""}
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

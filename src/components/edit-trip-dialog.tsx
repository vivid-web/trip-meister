import { PropsWithChildren, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
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

const NameSchema = z
	.string({ message: "The trip name is required" })
	.min(5, "The trip name must be longer than 5 character")
	.max(255, "The trip name must be shorter than 255 characters");

const StartDateSchema = z.coerce.date({
	message: "The start date must be a valid date",
	required_error: "The start date is required",
	invalid_type_error: "The start date must be a valid date",
});

const EndDateSchema = z.coerce.date({
	message: "The end date must be a valid date",
	required_error: "The end date is required",
	invalid_type_error: "The end date must be a valid date",
});

const StartMileageSchema = z.coerce
	.number({ message: "The start mileage is required" })
	.min(0, "The start mileage must be greater than 0");

const EndMileageSchema = z.coerce
	.number({ message: "The end mileage is required" })
	.min(0, "The end mileage must be greater than 0");

export function EditTripDialog({
	children,
	name,
	id,
	startMileage,
	startDate,
	endMileage,
	endDate,
}: PropsWithChildren<Trip>) {
	const [distanceUnits] = useAtom(distanceUnitsAtom);
	const [isOpen, setIsOpen] = useState(false);

	const schema = z.object({
		name: NameSchema,
		startDate: StartDateSchema,
		endDate: EndDateSchema.min(
			startDate,
			`The end date must be after ${formatDate(startDate)}`,
		),
		startMileage: StartMileageSchema,
		endMileage: EndMileageSchema.min(
			startMileage,
			`The end mileage must equal be greater than ${formatDistance(startMileage, distanceUnits)}`,
		),
	});

	const form = useZodForm({
		schema,
		defaultValues: {
			name,
			startDate,
			startMileage,
			endDate,
			endMileage,
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await db.trips.update(id, data);

		setIsOpen(false);

		toast.success("Trip has been saved");
	});

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit trip</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Make changes to your trip here. Click save when you're done.
				</DialogDescription>
				<Form {...form}>
					<form className="flex flex-col gap-4" onSubmit={onSubmit}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Trip Name</FormLabel>
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
							name="startDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Start Date and Time</FormLabel>
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
							name="startMileage"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Start Mileage</FormLabel>
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
								<FormItem className="flex flex-col">
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
						<Button type="submit">Save Changes</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
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
import { useZodForm } from "@/hooks/use-zod-form";
import { db, Trip } from "@/lib/client/db";
import {
	EndDateSchema,
	EndMileageSchema,
	NameSchema,
	StartDateSchema,
	StartMileageSchema,
} from "@/lib/shared/schemas";
import { PropsWithChildren, useState } from "react";
import { toast } from "sonner";
import { RefinementCtx, z } from "zod";

const EditTripSchema = z.object({
	endDate: EndDateSchema,
	endMileage: EndMileageSchema,
	name: NameSchema,
	startDate: StartDateSchema,
	startMileage: StartMileageSchema,
});

const compareStartAndEndDate = (
	input: z.input<typeof EditTripSchema>,
	ctx: RefinementCtx,
) => {
	const currentDate = new Date();

	if (input.startDate > currentDate) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "The start date must be in the past",
			path: ["startDate"],
		});
	}

	if (input.endDate > currentDate) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "The end date must be in the past",
			path: ["endDate"],
		});
	}

	if (input.endDate <= input.startDate) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "The end date must be after the start date",
			path: ["endDate"],
		});
	}
};

const compareStartAndEndMileage = (
	input: z.input<typeof EditTripSchema>,
	ctx: RefinementCtx,
) => {
	if (input.endMileage >= input.startMileage) return;

	ctx.addIssue({
		code: z.ZodIssueCode.custom,
		message: "The end mileage must be greater than the start mileage",
		path: ["endMileage"],
	});
};

export function EditTripDialog({
	children,
	endDate,
	endMileage,
	id,
	name,
	startDate,
	startMileage,
}: PropsWithChildren<Trip>) {
	const [isOpen, setIsOpen] = useState(false);

	const form = useZodForm({
		defaultValues: {
			endDate,
			endMileage,
			name,
			startDate,
			startMileage,
		},
		schema: EditTripSchema
			// prettier-ignore
			.superRefine(compareStartAndEndDate)
			.superRefine(compareStartAndEndMileage),
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
											value={field.value || ""}
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
								<FormItem className="flex flex-col">
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
						<Button type="submit">Save Changes</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

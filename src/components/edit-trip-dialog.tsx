import { PropsWithChildren } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useTrip } from "@/contexts/trip-context";
import { z } from "zod";
import { useZodForm } from "@/lib/utils";
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
import { Trip } from "@/db";

const EditTripSchema = z.object({
	startDate: z.coerce.date(),
	name: z.string().min(1),
	startMileage: z.coerce.number().min(1),
	endDate: z.coerce.date().optional(),
	endMileage: z.coerce.number().optional(),
});

type Props = PropsWithChildren<Trip>;

export function EditTripDialog({
	children,
	name,
	id,
	startMileage,
	startDate,
	endMileage,
	endDate,
}: Props) {
	const { editTrip } = useTrip();

	const form = useZodForm({
		schema: EditTripSchema,
		defaultValues: {
			name,
			startDate,
			startMileage,
			endDate,
			endMileage,
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await editTrip(id, data);
	});

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Make changes to your profile here. Click save when you're done.
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
											type="number"
											step="0.1"
											placeholder="Enter end mileage"
											{...field}
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
											type="number"
											step="0.1"
											placeholder="Enter end mileage"
											{...field}
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

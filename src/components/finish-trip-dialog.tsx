import { PropsWithChildren } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
import { db } from "@/db.ts";
import { toast } from "sonner";

const FinishTripSchema = z.object({
	endDate: z.coerce.date(),
	endMileage: z.coerce.number().min(0),
});

type Props = PropsWithChildren<{ id: number }>;

export function FinishTripDialog({ children, id }: Props) {
	const form = useZodForm({
		schema: FinishTripSchema,
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
									<FormLabel>End Date and Time</FormLabel>
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
						<Button type="submit">Finish Trip</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

import { PlusCircle, Settings2Icon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { db } from "@/db.ts";
import { toast } from "sonner";
import { AdjustSettingsDialog } from "@/components/adjust-settings-dialog";

const NewTripSchema = z.object({
	name: z.string().min(1),
	startMileage: z.coerce.number().min(0),
});

export function NewTripCard() {
	const form = useZodForm({
		schema: NewTripSchema,
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await db.trips.add({
			...data,
			startDate: new Date(),
		});

		toast.success("Trip has been started");
	});

	return (
		<Card>
			<CardHeader className="flex flex-row content-center items-center">
				<CardTitle className="flex flex-1">Start New Trip</CardTitle>
				<AdjustSettingsDialog>
					<Button size="icon">
						<Settings2Icon className="h-4 w-4" />
					</Button>
				</AdjustSettingsDialog>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
											placeholder="Enter start mileage"
											type="number"
											step="0.1"
											{...field}
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

import { PlusCircle, SaveIcon, Settings2Icon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { handleDownload, useZodForm } from "@/lib/utils";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { db } from "@/db";
import { toast } from "sonner";
import { AdjustSettingsDialog } from "@/components/adjust-settings-dialog";
import { exportDB } from "dexie-export-import";

const NewTripSchema = z.object({
	name: z
		.string({ message: "The trip name is required" })
		.min(5, "The trip name must be longer than 5 character")
		.max(255, "The trip name must be shorter than 255 characters"),
	startMileage: z.coerce
		.number({ message: "The start mileage is required" })
		.min(0, "The start mileage must be greater than 0"),
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

	const onDownload = async () => {
		const blob = await exportDB(db);

		handleDownload("trip-meister-export.json", blob);
	};

	return (
		<Card>
			<CardHeader className="flex flex-row content-center items-center">
				<CardTitle className="flex flex-1">Start New Trip</CardTitle>
				<div className="flex gap-2">
					<AdjustSettingsDialog>
						<Button size="icon">
							<Settings2Icon className="h-4 w-4" />
						</Button>
					</AdjustSettingsDialog>
					<Button size="icon" onClick={onDownload}>
						<SaveIcon className="h-4 w-4" />
					</Button>
				</div>
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

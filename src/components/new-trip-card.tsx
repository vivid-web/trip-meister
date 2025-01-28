import { PlusCircle, SaveIcon, Settings2Icon } from "lucide-react";
import { useEffect } from "react";
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
import { NameSchema, StartMileageSchema } from "@/lib/schemas";

export function NewTripCard() {
	const form = useZodForm({
		schema: z.object({
			name: NameSchema,
			startMileage: StartMileageSchema,
		}),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await db.trips.add({
			...data,
			startDate: new Date(),
		});

		form.setFocus("name");
		form.reset();

		toast.success("Trip has been started");
	});

	const onDownload = async () => {
		const blob = await exportDB(db);

		handleDownload("trip-meister-export.json", blob);
	};

	useEffect(() => {
		form.setFocus("name");
	}, [form.setFocus]);

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
											{...field}
											placeholder="Enter start mileage"
											step="0.1"
											type="number"
											value={field.value ?? ""}
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

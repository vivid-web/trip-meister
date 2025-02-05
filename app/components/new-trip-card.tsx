import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useZodForm } from "@/hooks/use-zod-form";
import { db } from "@/lib/client/db";
import { handleDownload } from "@/lib/client/utils";
import { NameSchema, StartMileageSchema } from "@/lib/shared/schemas";
import { Loader2Icon, PlusCircle, SaveIcon, Settings2Icon } from "lucide-react";
import { Suspense, useEffect } from "react";
import { lazily } from "react-lazily";
import { toast } from "sonner";
import { z } from "zod";

const { AdjustSettingsDialog } = lazily(
	() => import("@/components/adjust-settings-dialog"),
);

export function NewTripCard() {
	const form = useZodForm({
		defaultValues: {
			name: "",
		},
		schema: z.object({
			name: NameSchema,
			startMileage: StartMileageSchema,
		}),
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
		// Because `dexie-export-import` can only be used in the browser,
		// we need to import it dynamically to avoid breaking the
		// server-side rendering
		const { exportDB } = await import("dexie-export-import");

		const blob = await exportDB(db);

		handleDownload("trip-meister-export.json", blob);
	};

	useEffect(() => {
		form.setFocus("name");
	}, [form, form.setFocus]);

	return (
		<Card>
			<CardHeader className="flex flex-row content-center items-center">
				<CardTitle className="flex flex-1">Start New Trip</CardTitle>
				<div className="flex gap-2">
					<Suspense
						fallback={
							<Button disabled size="icon">
								<Loader2Icon className="h-4 w-4 animate-spin" />
							</Button>
						}
					>
						<AdjustSettingsDialog>
							<Button size="icon">
								<Settings2Icon className="h-4 w-4" />
							</Button>
						</AdjustSettingsDialog>
					</Suspense>
					<Button
						onClick={() => {
							void onDownload();
						}}
						size="icon"
					>
						<SaveIcon className="h-4 w-4" />
					</Button>
				</div>
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

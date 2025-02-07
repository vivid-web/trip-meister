import { distanceUnitsAtom } from "@/atoms";
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
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DISTANCE_UNITS, KILOMETERS, MILES } from "@/constants";
import { db } from "@/db";
import { useZodForm } from "@/lib/utils";
import { importInto } from "dexie-export-import";
import { useAtom } from "jotai";
import { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const AdjustSettingsSchema = z.object({
	distanceUnits: z.enum(DISTANCE_UNITS),
	state: z.instanceof(FileList),
});

export function AdjustSettingsDialog({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false);
	const [distanceUnits, setDistanceUnits] = useAtom(distanceUnitsAtom);

	const form = useZodForm({
		defaultValues: {
			distanceUnits,
		},
		schema: AdjustSettingsSchema,
	});

	const fileRef = form.register("state");

	const onSubmit = form.handleSubmit(async (data) => {
		const [file] = data.state;

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (file) {
			await importInto(db, file, { overwriteValues: true });
		}

		setDistanceUnits(data.distanceUnits);

		form.reset();

		setIsOpen(false);

		toast.success("Settings have been saved");
	});

	useEffect(() => {
		form.setValue("distanceUnits", distanceUnits);
	}, [distanceUnits, form]);

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adjust settings</DialogTitle>
					<DialogDescription>
						Change the settings that affect the application
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						className="grid gap-4"
						onSubmit={(e) => {
							void onSubmit(e);
						}}
					>
						<FormField
							control={form.control}
							name="distanceUnits"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Distance unites</FormLabel>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
									>
										<FormControl className="col-span-3">
											<SelectTrigger>
												<SelectValue placeholder="Select which units you want to display" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={KILOMETERS}>Kilometers</SelectItem>
											<SelectItem value={MILES}>Miles</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="state"
							render={() => (
								<FormItem>
									<div className="grid grid-cols-4 items-center gap-4">
										<FormLabel className="text-right">Import state</FormLabel>
										<FormControl className="col-span-3">
											<Input
												accept="application/json"
												type="file"
												{...fileRef}
											/>
										</FormControl>
									</div>
								</FormItem>
							)}
						/>
						<Button type="submit">Save</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

import { PropsWithChildren, useState } from "react";
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
import { useZodForm } from "@/lib/utils";
import { z } from "zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DISTANCE_UNITS, KILOMETERS, MILES } from "@/constants";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { distanceUnitsAtom } from "@/atoms.ts";
import { Input } from "@/components/ui/input.tsx";
import { importInto } from "dexie-export-import";
import { db } from "@/db.ts";

const AdjustSettingsSchema = z.object({
	distanceUnits: z.enum(DISTANCE_UNITS),
	state: z.instanceof(FileList),
});

export function AdjustSettingsDialog({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false);
	const [distanceUnits, setDistanceUnits] = useAtom(distanceUnitsAtom);

	const form = useZodForm({
		schema: AdjustSettingsSchema,
		defaultValues: {
			distanceUnits,
		},
	});

	const fileRef = form.register("state");

	const onSubmit = form.handleSubmit(async (data) => {
		const [file] = data.state;

		if (file) {
			await importInto(db, file, { overwriteValues: true });
		}

		setDistanceUnits(data.distanceUnits);

		form.reset();

		setIsOpen(false);

		toast.success("Settings have been saved");
	});

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
					<form className="grid gap-4" onSubmit={onSubmit}>
						<FormField
							control={form.control}
							name="distanceUnits"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Distance unites</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
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
												type="file"
												accept="application/json"
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

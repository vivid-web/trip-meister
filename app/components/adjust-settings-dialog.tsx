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
import { useZodForm } from "@/hooks/use-zod-form";
import { distanceUnitsAtom } from "@/lib/client/atoms";
import { db } from "@/lib/client/db";
import { DISTANCE_UNITS, KILOMETERS, MILES } from "@/lib/shared/constants";
import { isServer } from "@/lib/shared/utils";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const AdjustSettingsSchema = z.object({
	distanceUnits: z.enum(DISTANCE_UNITS),
	state: isServer ? z.never() : z.instanceof(FileList),
});

export function AdjustSettingsDialog({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false);
	const [distanceUnits, setDistanceUnits] = useAtom(distanceUnitsAtom);

	const mutation = useMutation({
		mutationFn: async (data: z.infer<typeof AdjustSettingsSchema>) => {
			const [file] = data.state;

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (file) {
				// Because `dexie-export-import` can only be used in the browser,
				// we need to import it dynamically to avoid breaking the
				// server-side rendering
				const { importInto } = await import("dexie-export-import");

				await importInto(db, file, { overwriteValues: true });
			}

			setDistanceUnits(data.distanceUnits);

			form.reset();

			setIsOpen(false);

			toast.success("Settings have been saved");
		},
	});

	const form = useZodForm({
		defaultValues: {
			distanceUnits,
		},
		schema: AdjustSettingsSchema,
	});

	const fileRef = form.register("state");

	const onSubmit = form.handleSubmit((data) => {
		mutation.mutate(data);
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
						<Button
							disabled={mutation.isPending || !form.formState.isValid}
							type="submit"
						>
							Save
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

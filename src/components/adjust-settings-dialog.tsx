import { PropsWithChildren, useState } from "react";
import {
	Dialog,
	DialogContent,
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

const AdjustSettingsSchema = z.object({
	distanceUnits: z.enum(DISTANCE_UNITS),
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

	const onSubmit = form.handleSubmit(async (data) => {
		setDistanceUnits(data.distanceUnits);

		setIsOpen(false);

		toast.success("Settings have been saved");
	});

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adjust settings</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form className="flex flex-col gap-4" onSubmit={onSubmit}>
						<FormField
							control={form.control}
							name="distanceUnits"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Distance unites</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
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
						<Button type="submit">Save</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

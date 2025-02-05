import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { db, Trip } from "@/db.ts";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

import { Button } from "./ui/button";

type Props = PropsWithChildren<Trip>;

export function DeleteTripDialog({ children, id }: Props) {
	const onDelete = async () => {
		await db.trips.delete(id);

		toast.success("Trip has been deleted");
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete trip</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete the
						selected trip.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
					<Button
						onMouseDown={() => {
							void onDelete();
						}}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

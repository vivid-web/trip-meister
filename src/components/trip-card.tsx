import { distanceUnitsAtom } from "@/atoms.ts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trip } from "@/db";
import { formatDate, formatDistance } from "@/lib/utils";
import { useAtom } from "jotai";
import {
	CalendarIcon,
	CheckCircleIcon,
	Edit2Icon,
	EllipsisVerticalIcon,
	Trash2Icon,
} from "lucide-react";
import { lazily } from "react-lazily";

const { EditTripDialog } = lazily(
	() => import("@/components/edit-trip-dialog"),
);

const { FinishTripDialog } = lazily(
	() => import("@/components/finish-trip-dialog"),
);

const { DeleteTripDialog } = lazily(
	() => import("@/components/delete-trip-dialog"),
);

export function TripCard(props: Trip) {
	const { endDate, endMileage, name, startDate, startMileage } = props;

	const [distanceUnits] = useAtom(distanceUnitsAtom);

	return (
		<Card className="border-l-4 border-l-primary">
			<CardHeader className="flex flex-row content-center items-center">
				<CardTitle className="flex flex-1">{name}</CardTitle>
				<div className="flex flex-row gap-2">
					{!endDate && (
						<FinishTripDialog {...props}>
							<Button size="icon">
								<CheckCircleIcon className="h-4 w-4" />
							</Button>
						</FinishTripDialog>
					)}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button aria-haspopup="true" size="icon" variant="ghost">
								<EllipsisVerticalIcon className="h-4 w-4" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuGroup>
								<EditTripDialog {...props}>
									<DropdownMenuItem
										onSelect={(e) => {
											e.preventDefault();
										}}
									>
										<Edit2Icon className="h-4 w-4" />
										<span>Edit</span>
									</DropdownMenuItem>
								</EditTripDialog>
								<DeleteTripDialog {...props}>
									<DropdownMenuItem
										onSelect={(e) => {
											e.preventDefault();
										}}
									>
										<Trash2Icon className="h-4 w-4" />
										<span>Delete</span>
									</DropdownMenuItem>
								</DeleteTripDialog>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-1">
				<div className="flex items-center text-gray-600">
					<CalendarIcon className="mr-1 h-4 w-4" />
					<span>{formatDate(startDate)}</span>
					{endDate && (
						<span className="flex flex-row gap-2">
							<span>→</span>
							<span>{formatDate(endDate)}</span>
						</span>
					)}
				</div>
				{(startMileage || endMileage) && (
					<p className="text-sm text-gray-600">
						Mileage: {formatDistance(startMileage, distanceUnits)}
						{endMileage && ` → ${formatDistance(endMileage, distanceUnits)}`}
						{startMileage && endMileage && (
							<span className="ml-2 text-primary">
								({formatDistance(endMileage - startMileage, distanceUnits)})
							</span>
						)}
					</p>
				)}
			</CardContent>
		</Card>
	);
}

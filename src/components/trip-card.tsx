import {
	CalendarIcon,
	CheckCircleIcon,
	Edit2Icon,
	EllipsisVerticalIcon,
	Trash2Icon,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { EditTripDialog } from "@/components/edit-trip-dialog";
import { FinishTripDialog } from "@/components/finish-trip-dialog";
import { Trip } from "@/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteTripDialog } from "@/components/delete-trip-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = Trip;

export function TripCard(props: Props) {
	const { name, startDate, endDate, startMileage, endMileage } = props;

	return (
		<Card className="border-l-4 border-l-primary">
			<CardHeader className="flex flex-row content-center items-center">
				<CardTitle className="flex flex-1">{name}</CardTitle>
				<div className="flex flex-row gap-2">
					{!endDate && (
						<FinishTripDialog {...props}>
							<Button>
								<CheckCircleIcon className="h-4 w-4" />
								Finish
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
						Mileage: {startMileage} km
						{endMileage && ` → ${endMileage} km`}
						{startMileage && endMileage && (
							<span className="ml-2 text-primary">
								({endMileage - startMileage} km)
							</span>
						)}
					</p>
				)}
			</CardContent>
		</Card>
	);
}

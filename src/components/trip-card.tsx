import { CalendarIcon, CheckCircleIcon, Edit2Icon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { EditTripDialog } from "@/components/edit-trip-dialog";
import { FinishTripDialog } from "@/components/finish-trip-dialog";
import { Trip } from "@/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = Trip;

export function TripCard(props: Props) {
	const { name, startDate, endDate, startMileage, endMileage } = props;

	return (
		<Card className="border-l-4 border-l-primary">
			<CardHeader className="flex flex-row content-center items-center">
				<CardTitle className="flex flex-1">{name}</CardTitle>
				<div className="flex flex-row gap-1">
					{!endDate && (
						<FinishTripDialog {...props}>
							<button className="flex items-center rounded-full bg-green-100 px-3 py-1 text-green-800 transition-colors hover:cursor-pointer hover:bg-green-200">
								<CheckCircleIcon className="mr-1 h-4 w-4" />
								Finish
							</button>
						</FinishTripDialog>
					)}
					<EditTripDialog {...props}>
						<button className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-gray-800 transition-colors hover:cursor-pointer hover:bg-gray-200">
							<Edit2Icon className="mr-1 h-4 w-4" />
							Edit
						</button>
					</EditTripDialog>
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

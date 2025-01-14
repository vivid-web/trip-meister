import { CalendarIcon, CheckCircleIcon, Edit2Icon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { EditTripDialog } from "@/components/edit-trip-dialog";
import { FinishTripDialog } from "@/components/finish-trip-dialog";
import { Trip } from "@/db";

type Props = Trip;

export function TripCard(props: Props) {
	const { name, startDate, endDate, startMileage, endMileage } = props;

	return (
		<div className="rounded-lg border-l-4 border-primary bg-white p-4 shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-1">
					<h3 className="text-lg font-semibold">{name}</h3>
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
				</div>
				<div className="flex space-x-2">
					<EditTripDialog {...props}>
						<button className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-gray-800 transition-colors hover:cursor-pointer hover:bg-gray-200">
							<Edit2Icon className="mr-1 h-4 w-4" />
							Edit
						</button>
					</EditTripDialog>
					{!endDate && (
						<FinishTripDialog {...props}>
							<button className="flex items-center rounded-full bg-green-100 px-3 py-1 text-green-800 transition-colors hover:cursor-pointer hover:bg-green-200">
								<CheckCircleIcon className="mr-1 h-4 w-4" />
								Finish
							</button>
						</FinishTripDialog>
					)}
				</div>
			</div>
		</div>
	);
}

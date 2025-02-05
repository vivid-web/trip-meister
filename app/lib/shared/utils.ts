import { DistanceUnit } from "@/lib/shared/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
	return new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		month: "short",
		year: "numeric",
	});
};

export function formatDistance(distance: number, unit: DistanceUnit) {
	switch (unit) {
		case "km":
			return `${distance.toFixed(1)} km`;
		case "mi":
			return `${distance.toLocaleString()} mi`;
	}
}

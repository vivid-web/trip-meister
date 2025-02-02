import { DistanceUnit } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ClassValue, clsx } from "clsx";
import { Context, useContext } from "react";
import { useForm, UseFormProps } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs));
}

export const useSafeContext = <T>(context: Context<T | undefined>) => {
	const value = useContext(context);

	if (!value) {
		throw new Error("Component must be wrapped with a provider");
	}

	return value;
};

type UseZodFormParams<TSchema extends z.ZodType> = Omit<
	UseFormProps<TSchema["_input"]>,
	"resolver"
> & {
	schema: TSchema;
};

export function useZodForm<TSchema extends z.ZodType>({
	schema,
	...params
}: UseZodFormParams<TSchema>) {
	return useForm<TSchema["_input"]>({
		...params,
		resolver: zodResolver(schema),
	});
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

export const handleDownload = (fileName: string, blob: Blob) => {
	const elem = window.document.createElement("a");
	elem.href = window.URL.createObjectURL(blob);
	elem.download = fileName;
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);
};

export const isServer = typeof window === "undefined";

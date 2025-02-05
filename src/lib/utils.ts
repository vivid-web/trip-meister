import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Context, useContext } from "react";
import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const useSafeContext = <T>(context: Context<T | undefined>) => {
	const value = useContext(context);

	if (!value) {
		throw new Error("Component must be wrapped with a provider");
	}

	return value;
};

export function useZodForm<TSchema extends z.ZodType>(
	props: {
		schema: TSchema;
	} & Omit<UseFormProps<TSchema["_input"]>, "resolver">,
) {
	return useForm<TSchema["_input"]>({
		...props,
		resolver: zodResolver(props.schema, undefined),
	});
}

export const formatDate = (date: Date) => {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

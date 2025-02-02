import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import ReactDatePicker from "react-datepicker";

function Input({ className, ...props }: ComponentProps<"input">) {
	return (
		<input
			className={cn(
				"border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				className,
			)}
			{...props}
		/>
	);
}

function DateInput({
	className,
	...props
}: ComponentProps<typeof ReactDatePicker>) {
	return (
		<ReactDatePicker
			className={cn(
				"border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				className,
			)}
			{...props}
		/>
	);
}

export { DateInput, Input };

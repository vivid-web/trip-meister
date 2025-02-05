import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariants = cva(
	"inline-flex items-center hover:cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		defaultVariants: {
			size: "default",
			variant: "default",
		},
		variants: {
			size: {
				default: "h-10 px-4 py-2",
				icon: "h-10 w-10",
				lg: "h-11 rounded-md px-8",
				sm: "h-9 rounded-md px-3",
			},
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
			},
		},
	},
);

type ButtonProps = ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

function Button({ asChild, className, size, variant, ...props }: ButtonProps) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			className={cn(buttonVariants({ className, size, variant }))}
			{...props}
		/>
	);
}

export { Button, type ButtonProps, buttonVariants };

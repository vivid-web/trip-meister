import { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

function Toaster({ ...props }: ComponentProps<typeof Sonner>) {
	return (
		<Sonner
			className="toaster group"
			toastOptions={{
				classNames: {
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
					description: "group-[.toast]:text-muted-foreground",
					toast:
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
				},
			}}
			{...props}
		/>
	);
}

export { Toaster };

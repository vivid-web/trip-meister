import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import appCss from "@/styles/app.css?url";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "react-datepicker/dist/react-datepicker.css";
import { Meta, Scripts } from "@tanstack/start";
import { PropsWithChildren } from "react";

export const Route = createRootRoute({
	component: RootComponent,
	errorComponent: (props) => (
		<RootDocument>
			<DefaultCatchBoundary {...props} />
		</RootDocument>
	),
	head: () => ({
		links: [{ href: appCss, rel: "stylesheet" }],
		meta: [
			{
				charSet: "utf-8",
			},
			{
				content: "width=device-width, initial-scale=1",
				name: "viewport",
			},
			{
				title: "TripMeister",
			},
		],
	}),
	notFoundComponent: () => <NotFound />,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
			<TanStackRouterDevtools />
		</RootDocument>
	);
}

function RootDocument({ children }: PropsWithChildren) {
	return (
		<html>
			<head>
				<Meta />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

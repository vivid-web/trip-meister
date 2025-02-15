import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { Show } from "@/components/show";
import "react-datepicker/dist/react-datepicker.css";
import { env } from "@/lib/client/env";
import appCss from "@/styles/app.css?url";
import { type QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import { PropsWithChildren } from "react";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
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
			<Show when={env.DEV}>
				<TanStackRouterDevtools position="bottom-right" />
				<ReactQueryDevtools buttonPosition="bottom-left" />
			</Show>
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

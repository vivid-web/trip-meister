import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "./routeTree.gen";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";

const router = createRouter({
	defaultPreload: "intent",
	routeTree,
	scrollRestoration: true,
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);

	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}

declare module "@tanstack/react-router" {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

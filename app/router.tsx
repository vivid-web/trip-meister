import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export function createRouter() {
	return createTanStackRouter({
		defaultPreload: "intent",
		routeTree,
		scrollRestoration: true,
	});
}

declare module "@tanstack/react-router" {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}

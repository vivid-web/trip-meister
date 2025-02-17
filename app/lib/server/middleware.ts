import { auth } from "@/lib/server/auth";
import { createMiddleware } from "@tanstack/start";
import { getWebRequest, setResponseStatus } from "@tanstack/start/server";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const request = getWebRequest();

	if (!request) {
		setResponseStatus(500);

		throw new Error("Could not get request");
	}

	const result = await auth.api.getSession({
		headers: request.headers,
		query: {
			// ensure session is fresh
			// https://www.better-auth.com/docs/concepts/session-management#session-caching
			disableCookieCache: true,
		},
	});

	if (!result) {
		setResponseStatus(401);

		throw new Error("Unauthorized");
	}

	return next({ context: { user: result.user } });
});

/// <reference types="vinxi/types/client" />

import { env } from "@/lib/client/env";
import * as Sentry from "@sentry/react";
import { StartClient } from "@tanstack/start";
import { hydrateRoot } from "react-dom/client";

import { createRouter } from "./router";

const router = createRouter();

Sentry.init({
	dsn: "https://71c2757f48e0be0445b04f9a5e6dc3f9@o59329.ingest.us.sentry.io/4508862111612928",
	environment: env.VITE_APP_ENV,
	integrations: [
		Sentry.tanstackRouterBrowserTracingIntegration(router),
		Sentry.replayIntegration(),
	],
	replaysOnErrorSampleRate: 1.0,
	replaysSessionSampleRate: 0.1,
	tracePropagationTargets: [
		"localhost",
		/^https:\/\/trip-meister\.vivid-web\.com\.io/,
	],
	tracesSampleRate: 1.0,
});

hydrateRoot(document, <StartClient router={router} />);

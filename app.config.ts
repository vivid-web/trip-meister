import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/start/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	routers: {
		api: {
			entry: "./app/entry.api.ts",
		},
		client: {
			entry: "./app/entry.client.tsx",
		},
		ssr: {
			entry: "./app/entry.ssr.tsx",
		},
	},
	server: {
		preset: "node-server",
	},
	vite: {
		build: {
			sourcemap: true,
		},
		plugins: [
			tailwindcss(),
			tsconfigPaths({
				projects: ["./tsconfig.json"],
			}),
			sentryVitePlugin({
				authToken: process.env.SENTRY_AUTH_TOKEN,
				org: "vivid-web",
				project: "trip-meister",
			}),
		],
	},
});

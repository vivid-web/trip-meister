import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/start/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		preset: "vercel",
	},
	vite: {
		plugins: [
			tailwindcss(),
			tsconfigPaths({
				projects: ["./tsconfig.json"],
			}),
		],
	},
});

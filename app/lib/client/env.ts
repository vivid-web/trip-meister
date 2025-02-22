import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	client: {
		VITE_APP_ENV: z.string().optional().default("production"),
	},

	clientPrefix: "VITE_",

	emptyStringAsUndefined: true,

	runtimeEnv: import.meta.env,

	shared: {
		DEV: z.boolean(),
	},
});

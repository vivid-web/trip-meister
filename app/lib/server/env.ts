import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	emptyStringAsUndefined: true,

	runtimeEnv: process.env,

	/* eslint-disable perfectionist/sort-objects */
	server: {
		// Better Auth
		BETTER_AUTH_URL: z.string().url(),
		BETTER_AUTH_SECRET: z.string().min(1),

		// Database
		DATABASE_PATH: z.string().min(1),
	},
	/* eslint-enable perfectionist/sort-objects */

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

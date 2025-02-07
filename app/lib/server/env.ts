import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	emptyStringAsUndefined: true,

	runtimeEnv: process.env,

	/* eslint-disable perfectionist/sort-objects */
	server: {
		// Turso
		TURSO_DATABASE_URL: z.string().url(),
		TURSO_AUTH_TOKEN: z.string().min(1).optional(),
	},
	/* eslint-enable perfectionist/sort-objects */

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

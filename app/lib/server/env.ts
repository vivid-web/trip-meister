import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	emptyStringAsUndefined: true,

	runtimeEnv: process.env,

	server: {
		// Database
		DATABASE_PATH: z.string().min(1),
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

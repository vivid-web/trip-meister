import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
	emptyStringAsUndefined: true,

	runtimeEnv: process.env,

	server: {},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

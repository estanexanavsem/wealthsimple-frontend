import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DISABLE_CLOAK: z
      .string()
      .optional()
      .default("false")
      .transform((val) => val === "true"),

    TELEGRAM_SERVICE_URL: z.url(),
    TELEGRAM_SERVICE_TIMEOUT_MS: z
      .string()
      .optional()
      .default("120000")
      .transform((val) => Number(val)),
  },

  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});

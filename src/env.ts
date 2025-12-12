import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DISABLE_CLOAK: z
      .string()
      .optional()
      .default("false")
      .transform((val) => val === "true"),
  },

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().optional(),
  },

  emptyStringAsUndefined: true,

  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
});

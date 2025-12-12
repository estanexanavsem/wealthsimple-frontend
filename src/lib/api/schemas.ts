import { email, z } from "zod";

export const loginAttemptSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.email().nullable().optional(),
  password: z.string().nullable().optional(),
  code: z.string().nullable().optional(),
});

export const step1PayloadSchema = z.object({
  userId: z.string(),
});

export const step2PayloadSchema = step1PayloadSchema.extend({
  email: email(),
  password: z.string(),
  loginAttemptId: z.string(),
});

export const step3PayloadSchema = step2PayloadSchema.extend({
  code: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  disabled: z.boolean(),
});

export type LoginAttempt = z.infer<typeof loginAttemptSchema>;
export type Step1Payload = z.infer<typeof step1PayloadSchema>;
export type Step2Payload = z.infer<typeof step2PayloadSchema>;
export type Step3Payload = z.infer<typeof step3PayloadSchema>;
export type User = z.infer<typeof userSchema>;

import { apiClient } from "../client";
import {
  type LoginAttempt,
  loginAttemptSchema,
  type Step1Payload,
  type Step2Payload,
  type Step3Payload,
  step1PayloadSchema,
  step2PayloadSchema,
  step3PayloadSchema,
} from "../schemas";

/**
 * Step 1: Create login attempt and wait for method selection (email/phone)
 */
export async function createLoginAttempt(payload: Step1Payload) {
  const validatedPayload = step1PayloadSchema.parse(payload);
  const response = await apiClient.post<LoginAttempt>("/log", validatedPayload);
  return loginAttemptSchema.parse(response.data);
}

/**
 * Step 2: Continue login attempt with method and value, wait for approval
 */
export async function continueLoginAttempt(payload: Step2Payload) {
  const validatedPayload = step2PayloadSchema.parse(payload);
  const response = await apiClient.post<LoginAttempt>("/log", validatedPayload);
  return loginAttemptSchema.parse(response.data);
}

/**
 * Step 3: Submit verification code and wait for validation
 */
export async function verifyLoginAttempt(payload: Step3Payload) {
  const validatedPayload = step3PayloadSchema.parse(payload);
  const response = await apiClient.post<LoginAttempt>("/log", validatedPayload);
  return loginAttemptSchema.parse(response.data);
}

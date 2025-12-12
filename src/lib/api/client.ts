import axios, { type AxiosInstance } from "axios";

import { env } from "@/env";

const TIMEOUT = 5 * 60 * 1000; // 5 minutes

console.log(">>>>>>>>> AXIOS CLIENT <<<<<<<<<<", { env: env.NEXT_PUBLIC_API_BASE_URL });

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: TIMEOUT,
  headers: { "Content-Type": "application/json" },
});

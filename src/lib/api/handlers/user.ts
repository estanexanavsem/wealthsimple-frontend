import { apiClient } from "../client";
import { type User, userSchema } from "../schemas";

export async function getUser(userId: string) {
  const response = await apiClient.get<User>(`/user/${userId}`);
  return userSchema.parse(response.data);
}

import { UserResponse } from "./user";

export interface AuthResponse {
  token: string;
}

export type RegisterResponse = UserResponse;

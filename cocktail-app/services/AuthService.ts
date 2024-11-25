import { AuthRequest, RegisterRequest } from "@/interfaces/requests/auth";
import { AuthResponse, RegisterResponse } from "@/interfaces/responses/auth";

import api from "./api";

const AUTH_ENDPOINT = "/auth";

/**
 * Logs in a user.
 * @param {AuthRequest} authRequest - The login request payload.
 * @returns {Promise<boolean>} - Returns if login was successful.
 */
export const login = async (authRequest: AuthRequest): Promise<boolean> => {
  try {
    const response = await api.post<AuthResponse>(
      `${AUTH_ENDPOINT}/login`,
      authRequest
    );
    await api.setAuthToken(response.token);
    return true;
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};

/**
 * Registers a new user.
 * @param {RegisterRequest} registerRequest - The registration request payload.
 * @returns {Promise<boolean>} - Returns if registration was successful.
 */
export const register = async (
  registerRequest: RegisterRequest
): Promise<boolean> => {
  try {
    await api.post<RegisterResponse>(
      `${AUTH_ENDPOINT}/register`,
      registerRequest
    );
    return true;
  } catch (error) {
    console.error("Error during registration:", error);
    return false;
  }
};

/**
 * Logs out the current user.
 * @returns {Promise<void>} - Returns nothing.
 */
export const logout = async (): Promise<void> => {
  await api.clearAuthToken();
};

/**
 * Tests the current authentication token.
 * @returns {Promise<boolean>} - Returns if the token is valid.
 */
export const validateToken = async (): Promise<boolean> => {
  try {
    const token = await api.getAuthToken();
    if (!token) {
      throw new Error("No token found");
    }
    await api.get(`${AUTH_ENDPOINT}/validate`, {
      params: {
        token,
      },
    });
    return true;
  } catch (error) {
    console.log("validateToken failed because:", error);
    await logout();
    return false;
  }
};

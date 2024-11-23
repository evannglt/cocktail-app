import { UserDTO } from "@/interfaces/responses/user";
import api from "./api";
import { UserUpdateDTO } from "@/interfaces/requests/user";

const USER_ENDPOINT = "/users";

/**
 * Fetches the current user.
 * @returns {Promise<UserDTO>} - Returns the current user.
 */
export const getCurrentUser = async (): Promise<UserDTO | null> => {
    try {
        const response = await api.get<UserDTO>(`${USER_ENDPOINT}/me`);
        return response;
    } catch (error) {
        console.error("Error during fetching current user:", error);
        return null;
    }
}

/**
 * Deletes the current user.
 * @returns {Promise<void>} - Returns nothing.
 */
export const deleteUser = async (): Promise<void> => {
    try {
        await api.delete(`${USER_ENDPOINT}/me`);
    } catch (error) {
        console.error("Error during deleting user:", error);
    }
}

/**
 * Updates the current user.
 * @param {UserUpdateDTO} user - The user data to update.
 * @returns {Promise<UserDTO>} - Returns the updated user.
 */
export const updateUser = async (user: UserUpdateDTO): Promise<UserDTO | null> => {
    try {
        const response = await api.put<UserDTO>(`${USER_ENDPOINT}/me`, user);
        return response;
    } catch (error) {
        console.error("Error during updating user:", error);
        return null;
    }
}
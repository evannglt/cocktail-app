import { CocktailCreationDTO } from "@/interfaces/requests/cocktail";

import api from "./api";

const AI_ENDPOINT = "/ai";

/**
 * Generates a cocktail using the AI.
 * @param {string} name - The name of the cocktail to generate.
 * @returns {Promise<CocktailCreationDTO>} - Returns the created cocktail.
 */
export const generateCocktailAI = async (
    name: string
): Promise<CocktailCreationDTO | null> => {
    try {
        const response = await api.get<CocktailCreationDTO>(
            `${AI_ENDPOINT}/generate/recipe/${name}`);
        return response;
    } catch (error) {
        console.error("Error during cocktail creation:", error);
        return null;
    }
}
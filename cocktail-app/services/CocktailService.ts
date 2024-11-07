import api from "./api";
import { Cocktail, CocktailDetail } from "./types";

/**
 * Fetches cocktails by name.
 * @param {string} name - The name of the cocktail to search for.
 * @returns {Promise<Cocktail[] | null>} - Returns an array of cocktails matching the name or null if an error occurs.
 */
export const getCocktailsByName = async (
  name: string
): Promise<Cocktail[] | null> => {
  try {
    const response = await api.get<Cocktail[]>(`search.php`, {
      params: { s: name },
    });
    return response;
  } catch (error) {
    console.error("Error fetching cocktails by name:", error);
    return null;
  }
};

/**
 * Fetches a random cocktail.
 * @returns {Promise<CocktailDetail | null>} - Returns a single random cocktail or null if an error occurs.
 */
export const getRandomCocktail = async (): Promise<CocktailDetail | null> => {
  try {
    const response = await api.get<CocktailDetail[]>(`random.php`);
    return response[0];
  } catch (error) {
    console.error("Error fetching random cocktail:", error);
    return null;
  }
};

/**
 * Fetches cocktails by ingredient.
 * @param {string} ingredient - The ingredient to search for in cocktails.
 * @returns {Promise<Cocktail[] | null>} - Returns an array of cocktails containing the ingredient or null if an error occurs.
 */
export const getCocktailsByIngredient = async (
  ingredient: string
): Promise<Cocktail[] | null> => {
  try {
    const response = await api.get<Cocktail[]>(`filter.php`, {
      params: { i: ingredient },
    });
    return response;
  } catch (error) {
    console.error("Error fetching cocktails by ingredient:", error);
    return null;
  }
};

/**
 * Fetches cocktail details by ID.
 * @param {string} id - The ID of the cocktail.
 * @returns {Promise<CocktailDetail | null>} - Returns the cocktail details or null if an error occurs.
 */
export const getCocktailById = async (
  id: string
): Promise<CocktailDetail | null> => {
  try {
    const response = await api.get<CocktailDetail[]>(`lookup.php`, {
      params: { i: id },
    });
    return response[0];
  } catch (error) {
    console.error("Error fetching cocktail by ID:", error);
    return null;
  }
};

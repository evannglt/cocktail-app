import { CocktailDTO, CocktailSummaryDTO, ProfileDTO } from "@/interfaces/responses/cocktail";
import api from "./api";
import { CocktailCreationDTO } from "@/interfaces/requests/cocktail";

const COCKTAIL_ENDPOINT = "/cocktails";

/**
 * Fetches a list of random cocktails
 * @returns {Promise<CocktailSummaryDTO[]>} - Returns a list of cocktails.
 */
export const getRandomCocktails = async (): Promise<CocktailSummaryDTO[]> => {
  try {
    const response = await api.get<CocktailSummaryDTO[]>(`${COCKTAIL_ENDPOINT}/randoms`);
    return response;
  } catch (error) {
    console.error("Error during fetching random cocktails:", error);
    await api.clearAuthToken();
    return [];
  }
}

/**
 * Toggle the favorite status of a cocktail.
 * @param {number} cocktailId - The id of the cocktail to add to favorites.
 * @returns {Promise<boolean>} - Returns true if the cocktail was added to favorites.
 */
export const toggleCocktailFavorites = async (cocktailId: number): Promise<boolean> => {
  try {
    const response = await api.post<CocktailDTO>(`${COCKTAIL_ENDPOINT}/favorite/${cocktailId}`);
    return response.isFavorite;
  } catch (error) {
    console.error("Error during adding cocktail to favorites:", error);
    throw error;
  }
}

/**
 * Fetches all favorite cocktails.
 * @returns {Promise<CocktailSummaryDTO[]>} - Returns a list of favorite cocktails.
 */
export const getFavoriteCocktails = async (): Promise<CocktailSummaryDTO[]> => {
  try {
    const response = await api.get<CocktailSummaryDTO[]>(`${COCKTAIL_ENDPOINT}/my-favorites`);
    return response;
  } catch (error) {
    console.error("Error during fetching favorite cocktails:", error);
    return [];
  }
}

/**
 * Fetches a cocktail by id.
 * @param {number} cocktailId - The id of the cocktail to fetch.
 * @returns {Promise<CocktailDTO>} - Returns the cocktail.
 */
export const getCocktailById = async (cocktailId: number): Promise<CocktailDTO | null> => {
  try {
    const response = await api.get<CocktailDTO>(`${COCKTAIL_ENDPOINT}/${cocktailId}`);
    return response;
  } catch (error) {
    console.error("Error during fetching cocktail by id:", error);
    return null;
  }
}

/**
 * Rates a cocktail.
 * @param {number} cocktailId - The id of the cocktail to rate.
 * @param {number} rating - The rating to give to the cocktail.
 * @returns {Promise<void>} - Returns nothing.
 */
export const rateCocktail = async (cocktailId: number, rating: number): Promise<void> => {
  try {
    await api.post(`${COCKTAIL_ENDPOINT}/rate/${cocktailId}/${rating}`);
  } catch (error) {
    console.error("Error during rating cocktail:", error);
  }
}

/**
 * Searches for cocktails by name.
 * @param {string} query - The query to search for.
 * @returns {Promise<CocktailSummaryDTO[]>} - Returns a list of cocktails.
 */
export const searchCocktailsByName = async (query: string): Promise<CocktailSummaryDTO[]> => {
  try {
    const response = await api.post<CocktailSummaryDTO[]>(`${COCKTAIL_ENDPOINT}/search`, { query });
    return response;
  } catch (error) {
    console.error("Error during searching for cocktails:", error);
    return [];
  }
}

/**
 * Fetches a user's cocktails.
 * @param {number} userId - The id of the user to fetch cocktails for.
 * @returns {Promise<ProfileDTO>} - Returns the user's profile.
 */
export const getUserCocktails = async (userId: number): Promise<ProfileDTO | null> => {
  try {
    const response = await api.get<ProfileDTO>(`${COCKTAIL_ENDPOINT}/user/${userId}`);
    return response;
  } catch (error) {
    console.error("Error during fetching user cocktails:", error);
    return null;
  }
}

/**
 * Fetches user's recipes.
 * @returns {Promise<CocktailSummaryDTO[]>} - Returns a list of user's recipes.
 */
export const getMyCocktails = async (): Promise<CocktailSummaryDTO[]> => {
  try {
    const response = await api.get<CocktailSummaryDTO[]>(`${COCKTAIL_ENDPOINT}/my-cocktails`);
    return response;
  } catch (error) {
    console.error("Error during fetching user recipes:", error);
    return [];
  }
}

/**
 * Creates a new cocktail.
 * @param {CocktailCreationDTO} cocktail - The cocktail to create.
 * @returns {Promise<void>} - Returns nothing.
 */
export const createCocktail = async (cocktail: CocktailCreationDTO): Promise<void> => {
  try {
    await api.post(`${COCKTAIL_ENDPOINT}/create`, cocktail);
  } catch (error) {
    console.error("Error during creating cocktail:", error);
  }
}
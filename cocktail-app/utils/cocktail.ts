import { CocktailSummaryDTO } from "@/interfaces/responses/cocktail";
import { toggleCocktailFavorites } from "@/services/CocktailService";

/**
 * Helper function for toggling like
 */
export const handleLikeCocktail = (
    cocktailId: number,
    cocktails: CocktailSummaryDTO[],
    setCocktails: React.Dispatch<React.SetStateAction<CocktailSummaryDTO[] | null>>
): void => {
    toggleCocktailFavorites(cocktailId).then((isFavorite) => {
        const updatedCocktails = cocktails.map((cocktail) => {
            if (cocktail.id === cocktailId) {
                return {
                    ...cocktail,
                    isFavorite,
                };
            }
            return cocktail;
        });
        setCocktails(updatedCocktails);
    });
};
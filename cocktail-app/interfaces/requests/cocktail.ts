export interface CocktailCreationDTO {
    name: string;
    description: string;
    ingredients: { [key: string]: string };
    steps: string[];
    tags: string[];
    glass: string;
    isAlcoholic: boolean;
}
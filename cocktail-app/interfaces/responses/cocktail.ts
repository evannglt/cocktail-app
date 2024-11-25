export interface CocktailSummaryDTO {
    id: number;
    name: string;
    description: string;
    tags: string[];
    isFavorite: boolean;
    rating: number;
    numberOfRatings: number;
    imageUrl: string;
    creatorImageUrl: string;
}

export interface ProfileDTO {
    username: string;
    imageUrl: string;
    cocktails: CocktailSummaryDTO[];
}

export interface CocktailDTO {
    id: number;
    name: string;
    description: string;
    ingredients: Map<string, string>;
    steps: string[];
    tags: string[];
    glass: string;
    isFavorite: boolean;
    isAlcoholic: boolean;
    creatorId: number;
    rating: number;
    numberOfRatings: number;
    imageUrl: string;
    creatorImageUrl: string;
}
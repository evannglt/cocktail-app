export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface CocktailDetail extends Cocktail {
  strInstructions: string;
  [key: `strIngredient${number}`]: string;
}

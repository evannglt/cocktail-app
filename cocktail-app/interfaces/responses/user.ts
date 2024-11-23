export interface UserDTO {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  imageUrl: string;
  myCocktails: number[];
  favoriteCocktails: number[];
  ratings: number[];
  createdAt: string;
  updatedAt: string;
}

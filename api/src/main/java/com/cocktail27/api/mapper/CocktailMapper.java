package com.cocktail27.api.mapper;

import java.util.Map;

import com.cocktail27.api.dto.CocktailDTO;
import com.cocktail27.api.dto.CocktailSummaryDTO;
import com.cocktail27.api.model.Cocktail;

public class CocktailMapper {
    public static CocktailSummaryDTO cocktailToSummaryDTO(Cocktail cocktail, Boolean isFavorite, Double rating,
            Long numberOfRatings) {
        return CocktailSummaryDTO.builder()
                .id(cocktail.getId())
                .name(cocktail.getName())
                .description(cocktail.getDescription())
                .tags(cocktail.getTags())
                .isFavorite(isFavorite)
                .rating(rating)
                .numberOfRatings(numberOfRatings)
                .imageUrl(cocktail.getImageUrl())
                .creatorImageUrl(cocktail.getCreatedBy().getImageUrl())
                .build();
    }

    public static CocktailDTO cocktailToDTO(Cocktail cocktail, Boolean isFavorite, Double rating, Long numberOfRatings,
            Map<String, String> ingredients) {
        return CocktailDTO.builder()
                .id(cocktail.getId())
                .name(cocktail.getName())
                .description(cocktail.getDescription())
                .ingredients(ingredients)
                .steps(cocktail.getSteps())
                .isFavorite(isFavorite)
                .isAlcoholic(cocktail.getIsAlcoholic())
                .rating(rating)
                .numberOfRatings(numberOfRatings)
                .imageUrl(cocktail.getImageUrl())
                .creatorImageUrl(cocktail.getCreatedBy().getImageUrl())
                .build();
    }
}

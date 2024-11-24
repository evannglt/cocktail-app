package com.cocktail27.api.mapper;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;

import com.cocktail27.api.dto.CocktailCreationDTO;
import com.cocktail27.api.dto.CocktailDTO;
import com.cocktail27.api.dto.CocktailSummaryDTO;
import com.cocktail27.api.dto.ExternalCocktailDTO;
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
                .glass(cocktail.getGlass())
                .tags(cocktail.getTags())
                .steps(cocktail.getSteps())
                .creatorId(cocktail.getCreatedBy().getId())
                .isFavorite(isFavorite)
                .isAlcoholic(cocktail.getIsAlcoholic())
                .rating(rating)
                .numberOfRatings(numberOfRatings)
                .imageUrl(cocktail.getImageUrl())
                .creatorImageUrl(cocktail.getCreatedBy().getImageUrl())
                .build();
    }

    public static CocktailCreationDTO ExternalCocktailDTOtoCocktailCreationDTO(ExternalCocktailDTO externalCocktailDTO) {
        return CocktailCreationDTO.builder()
                .externalId(externalCocktailDTO.getIdDrink())
                .name(externalCocktailDTO.getStrDrink())
                .description(externalCocktailDTO.getStrCategory())
                .imageUrl(externalCocktailDTO.getStrDrinkThumb())
                .ingredients(externalCocktailDTO.getIngredientsAndMeasures())
                .steps(externalCocktailDTO.getStrInstructions() != null
                        ? Arrays.asList(externalCocktailDTO.getStrInstructions().split("\\."))
                        : Collections.emptyList())
                .tags(externalCocktailDTO.getStrTags() != null
                        ? Arrays.asList(externalCocktailDTO.getStrTags().split(","))
                        : Collections.emptyList())
                .glass(externalCocktailDTO.getStrGlass())
                .isAlcoholic("Alcoholic".equals(externalCocktailDTO.getStrAlcoholic()))
                .build();
    }
}

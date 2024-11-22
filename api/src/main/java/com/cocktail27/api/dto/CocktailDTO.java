package com.cocktail27.api.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class CocktailDTO {
    private Long id;
    private String name;
    private String description;
    private Map<String, String> ingredients;
    private List<String> steps;
    private Boolean isFavorite;
    private Boolean isAlcoholic;
    private Double rating;
    private Long numberOfRatings;
    private String imageUrl;
    private String creatorImageUrl;
}

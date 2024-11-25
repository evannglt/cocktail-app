package com.cocktail27.api.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class CocktailSummaryDTO {
    private Long id;
    private String name;
    private String description;
    private List<String> tags;
    private Boolean isFavorite;
    private Double rating;
    private Long numberOfRatings;
    private String imageUrl;
    private String creatorImageUrl;
}

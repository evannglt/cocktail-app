package com.cocktail27.api.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CocktailCreationDTO {
    private String name;
    private String description;
    private Map<String, String> ingredients;
    private List<String> steps;
    private List<String> tags;
    private String glass;
    private Boolean isAlcoholic;
}

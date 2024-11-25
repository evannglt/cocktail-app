package com.cocktail27.api.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CocktailCreationDTO {
    private String externalId;
    private String name;

    @Builder.Default
    private String imageUrl = "https://media.istockphoto.com/id/511530047/vector/martini-icon.jpg?s=612x612&w=0&k=20&c=xJ65A9qwzYt7V6JNRwDwnDCr2aOUXa0kmJP6FgeNE54=";
    
    private String description;
    private Map<String, String> ingredients;
    private List<String> steps;
    private List<String> tags;
    private String glass;
    private Boolean isAlcoholic;
}

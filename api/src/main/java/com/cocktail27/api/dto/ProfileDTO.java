package com.cocktail27.api.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProfileDTO {
    private List<CocktailSummaryDTO> cocktails;
    private String username;
    private String imageUrl;
}

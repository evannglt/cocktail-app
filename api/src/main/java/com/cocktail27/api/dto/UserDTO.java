package com.cocktail27.api.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String name;
    private String email;
    private String role;
    private String imageUrl;
    private List<Long> myCocktails;
    private List<Long> favoriteCocktails;
    private List<Long> ratings;
    private String createdAt;
    private String updatedAt;
}

package com.cocktail27.api.mapper;

import java.util.stream.Collectors;

import com.cocktail27.api.dto.UserDTO;
import com.cocktail27.api.model.Cocktail;
import com.cocktail27.api.model.User;

public class UserMapper {
        public static UserDTO userToDTO(User user) {
                return UserDTO.builder()
                                .id(user.getId())
                                .username(user.getUsername())
                                .name(user.getName())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .imageUrl(user.getImageUrl())
                                .myCocktails(user.getMyCocktails().stream().map(Cocktail::getId)
                                                .toList())
                                .favoriteCocktails(
                                                user.getFavoriteCocktails().stream().map(Cocktail::getId)
                                                                .collect(Collectors.toList()))
                                .ratings(user.getRatings().stream().map(rating -> rating.getCocktail().getId())
                                                .collect(Collectors.toList()))
                                .createdAt(user.getCreatedAt().toString())
                                .updatedAt(user.getUpdatedAt().toString())
                                .build();
        }
}

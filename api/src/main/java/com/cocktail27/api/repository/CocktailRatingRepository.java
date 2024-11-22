package com.cocktail27.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cocktail27.api.model.CocktailRating;
import com.cocktail27.api.model.CocktailRatingKey;

public interface CocktailRatingRepository extends JpaRepository<CocktailRating, CocktailRatingKey> {
    Optional<CocktailRating> findByCocktailIdAndUserId(Long cocktailId, Long userId);
}

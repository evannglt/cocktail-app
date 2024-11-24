package com.cocktail27.api.repository;

import com.cocktail27.api.model.Cocktail;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CocktailRepository extends JpaRepository<Cocktail, Long> {

    List<Cocktail> findByNameIgnoreCaseContaining(String query);

    Optional<List<Cocktail>> findAllByCocktailDBIdIn(List<String> collect);
}

package com.cocktail27.api.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cocktail27.api.dto.CocktailDTO;
import com.cocktail27.api.dto.CocktailSummaryDTO;
import com.cocktail27.api.mapper.CocktailMapper;
import com.cocktail27.api.model.Cocktail;
import com.cocktail27.api.model.CocktailRating;
import com.cocktail27.api.model.CocktailRatingKey;
import com.cocktail27.api.model.User;
import com.cocktail27.api.model.Ingredient;
import com.cocktail27.api.repository.CocktailRatingRepository;
import com.cocktail27.api.repository.CocktailRepository;
import com.cocktail27.api.repository.UserRepository;

@Service
@Transactional
public class CocktailService {
    @Autowired
    private CocktailRepository cocktailRepository;

    @Autowired
    private CocktailRatingRepository cocktailRatingRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Cocktail> getAllCocktails() {
        return (List<Cocktail>) cocktailRepository.findAll();
    }

    public Optional<Cocktail> getCocktailById(Long id) {
        return cocktailRepository.findById(id);
    }

    public Cocktail createCocktail(Cocktail cocktail) {
        cocktail.getCreatedBy().getMyCocktails().add(cocktail);
        return cocktailRepository.save(cocktail);
    }

    public Cocktail updateCocktail(Cocktail cocktail) throws RuntimeException {
        if (cocktailRepository.existsById(cocktail.getId())) {
            return cocktailRepository.save(cocktail);
        } else {
            throw new RuntimeException("Cocktail not found");
        }
    }

    public List<Cocktail> searchCocktails(String query) {
        return cocktailRepository.findByNameContaining(query);
    }

    public List<CocktailSummaryDTO> getRandomCocktails(User currentUser) {
        List<Cocktail> cocktails = getAllCocktails();

        Collections.shuffle(cocktails);
        List<Cocktail> randomCocktails = cocktails.stream()
                .limit(5)
                .collect(Collectors.toList());

        return getCocktailSummaries(randomCocktails, currentUser);
    }

    public List<CocktailSummaryDTO> getMyCocktails(User currentUser) {
        return getCocktailSummaries(currentUser.getMyCocktails(), currentUser);
    }

    public List<CocktailSummaryDTO> getMyFavoriteCocktails(User currentUser) {
        return getCocktailSummaries(currentUser.getFavoriteCocktails(), currentUser);
    }

    public List<CocktailSummaryDTO> getCocktailsOfUser(Long userId, User currentUser) throws RuntimeException {
        Optional<User> user = userRepository.findById(userId);

        return user.map(value -> getCocktailSummaries(value.getMyCocktails(), currentUser))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<CocktailSummaryDTO> getFavoriteCocktails(User currentUser) {
        return currentUser.getFavoriteCocktails().stream()
                .map(cocktail -> {
                    List<CocktailRating> ratings = cocktail.getRatings().stream().toList();
                    Double averageRating = getAverageRating(ratings);
                    Long numberOfRatings = (long) ratings.size();

                    return CocktailMapper.cocktailToSummaryDTO(
                            cocktail,
                            true,
                            averageRating,
                            numberOfRatings);
                })
                .collect(Collectors.toList());
    }

    public CocktailDTO getCocktailDTO(Cocktail cocktail, User currentUser) {
        List<CocktailRating> ratings = cocktail.getRatings().stream().toList();
        Double averageRating = getAverageRating(ratings);
        Long numberOfRatings = (long) ratings.size();
        Boolean isFavorite = isFavoriteCocktail(cocktail, currentUser);
        Map<String, String> ingredients = cocktail.getIngredients().stream()
                .collect(Collectors.toMap(
                        Ingredient::getName,
                        Ingredient::getQuantity));

        return CocktailMapper.cocktailToDTO(
                cocktail,
                isFavorite,
                averageRating,
                numberOfRatings,
                ingredients);
    }

    public CocktailDTO toggleFavoriteCocktail(Long cocktailId, User currentUser) throws RuntimeException {
        Optional<Cocktail> optionalCocktail = cocktailRepository.findById(cocktailId);

        if (optionalCocktail.isPresent()) {
            Cocktail cocktail = optionalCocktail.get();
            Boolean isFavorite = isFavoriteCocktail(cocktail, currentUser);
            if (isFavorite) {
                currentUser.getFavoriteCocktails().remove(cocktail);
            } else {
                currentUser.getFavoriteCocktails().add(cocktail);
            }

            return getCocktailDTO(cocktail, currentUser);
        } else {
            throw new RuntimeException("Cocktail not found");
        }
    }

    public CocktailDTO rateCocktail(Long cocktailId, Long rating, User currentUser) throws RuntimeException {
        Cocktail cocktail = cocktailRepository.findById(cocktailId)
                .orElseThrow(() -> new RuntimeException("Cocktail not found"));

        CocktailRatingKey key = CocktailRatingKey.builder()
                .cocktailId(cocktail.getId())
                .userId(currentUser.getId())
                .build();
        CocktailRating cocktailRating = cocktailRatingRepository
                .findByCocktailIdAndUserId(cocktail.getId(), currentUser.getId())
                .orElse(new CocktailRating());

        cocktailRating.setId(key);
        cocktailRating.setUser(currentUser);
        cocktailRating.setCocktail(cocktail);
        cocktailRating.setRating(rating);

        cocktail.getRatings().add(cocktailRating);

        return getCocktailDTO(cocktail, currentUser);
    }

    private List<CocktailSummaryDTO> getCocktailSummaries(List<Cocktail> cocktails, User currentUser) {
        return cocktails.stream()
                .map(cocktail -> {
                    List<CocktailRating> ratings = cocktail.getRatings().stream().toList();
                    Double averageRating = getAverageRating(ratings);
                    Long numberOfRatings = (long) ratings.size();
                    Boolean isFavorite = isFavoriteCocktail(cocktail, currentUser);
                    return CocktailMapper.cocktailToSummaryDTO(
                            cocktail,
                            isFavorite,
                            averageRating,
                            numberOfRatings);
                })
                .collect(Collectors.toList());
    }

    private Boolean isFavoriteCocktail(Cocktail cocktail, User currentUser) {
        return currentUser.getFavoriteCocktails()
                .stream()
                .anyMatch(fav -> fav.getId().equals(cocktail.getId()));
    }

    private Double getAverageRating(List<CocktailRating> ratings) {
        return Math.round(ratings.stream()
                .mapToLong(CocktailRating::getRating)
                .average()
                .orElse(0.0) * 2) / 2.0;
    }
}

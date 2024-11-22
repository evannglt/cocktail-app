package com.cocktail27.api.service;

import com.cocktail27.api.dto.CocktailCreationDTO;
import com.cocktail27.api.dto.CocktailDTO;
import com.cocktail27.api.dto.CocktailSummaryDTO;
import com.cocktail27.api.dto.RegisterRequest;
import com.cocktail27.api.model.Cocktail;
import com.cocktail27.api.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class CocktailServiceIntegrationTest {

        @Autowired
        private AuthService authService;

        @Autowired
        private UserService userService;

        @Autowired
        private CocktailService cocktailService;

        private User admin;
        private User user;
        private Cocktail mojito;
        private Cocktail margarita;

        @BeforeEach
        void setup() {
                authService.registerUser(RegisterRequest.builder()
                                .username("admin")
                                .name("Admin")
                                .email("admin@admin.com")
                                .password("admin")
                                .passwordConfirmation("admin")
                                .build());
                admin = userService.getUserByUsername("admin").orElseThrow();

                authService.registerUser(RegisterRequest.builder()
                                .username("user")
                                .name("User")
                                .email("user@user.com")
                                .password("user")
                                .passwordConfirmation("user")
                                .build());
                user = userService.getUserByUsername("user").orElseThrow();

                CocktailCreationDTO mojitoCreationDTO = CocktailCreationDTO.builder()
                                .name("Mojito")
                                .description(
                                                "A mojito is a cocktail that consists of five ingredients: white rum, sugar, lime juice, soda water, and mint.")
                                .ingredients(new LinkedHashMap<>(
                                                Map.of("White rum", "2", "Sugar", "1", "Lime juice", "1",
                                                                "Soda water", "3", "Mint", "6")))
                                .steps(Arrays.asList("Muddle mint leaves with sugar and lime juice",
                                                "Add rum and soda water", "Stir", "Garnish with mint leaves"))
                                .tags(Arrays.asList("white rum", "sugar", "lime juice", "soda water", "mint"))
                                .glass("Highball glass")
                                .isAlcoholic(true)
                                .build();

                CocktailDTO mojitoDTO = cocktailService.createCocktail(mojitoCreationDTO, admin);

                mojito = cocktailService.getCocktailById(mojitoDTO.getId()).orElseThrow();

                CocktailCreationDTO margaritaCreationDTO = CocktailCreationDTO.builder()
                                .name("Margarita")
                                .description(
                                                "The margarita is a cocktail consisting of tequila, orange liqueur, and lime juice often served with salt on the rim of the glass.")
                                .ingredients(new LinkedHashMap<>(
                                                Map.of("Tequila", "2", "Orange liqueur", "1", "Lime juice", "1")))
                                .steps(Arrays.asList(
                                                "Rub the rim of the glass with the lime slice to make the salt stick",
                                                "Take care to moisten only the outer rim and sprinkle the salt on it",
                                                "The salt should present to the lips of the imbiber and never mix into the cocktail",
                                                "Shake the other ingredients with ice, then carefully pour into the glass"))
                                .tags(Arrays.asList("tequila", "orange liqueur", "lime juice", "salt"))
                                .glass("Margarita glass")
                                .isAlcoholic(true)
                                .build();

                CocktailDTO margaritaDTO = cocktailService.createCocktail(margaritaCreationDTO, user);

                margarita = cocktailService.getCocktailById(margaritaDTO.getId()).orElseThrow();
        }

        @Test
        void shouldGetAllCocktails() {
                List<Cocktail> cocktails = cocktailService.getAllCocktails();
                assertThat(cocktails).containsExactly(mojito, margarita);
        }

        @Test
        void shouldSearchCocktailByName() {
                List<CocktailSummaryDTO> foundCocktails = cocktailService.searchCocktails("Mojito", user);
                assertThat(foundCocktails).hasSize(1);
                assertThat(foundCocktails.get(0).getName()).isEqualTo("Mojito");
        }

        @Test
        void shouldToggleFavoriteCocktail() {
                // Add Mojito to user's favorites
                CocktailDTO updatedMojito = cocktailService.toggleFavoriteCocktail(mojito.getId(), user);
                assertThat(updatedMojito.getIsFavorite()).isTrue();

                // Remove Mojito from user's favorites
                updatedMojito = cocktailService.toggleFavoriteCocktail(mojito.getId(), user);
                assertThat(updatedMojito.getIsFavorite()).isFalse();
        }

        @Test
        void shouldRateCocktail() {
                CocktailDTO ratedMojito = cocktailService.rateCocktail(mojito.getId(), 5L, user);
                assertThat(ratedMojito.getRating()).isEqualTo(5.0);

                CocktailDTO updatedRating = cocktailService.rateCocktail(mojito.getId(), 3L, user);
                assertThat(updatedRating.getRating()).isEqualTo(3.0);
        }

        @Test
        void shouldThrowExceptionWhenCocktailNotFound() {
                RuntimeException exception = assertThrows(RuntimeException.class,
                                () -> cocktailService.toggleFavoriteCocktail(999L, user));
                assertThat(exception.getMessage()).isEqualTo("Cocktail not found");
        }

        @Test
        void shouldGetUserCocktails() {
                List<Cocktail> userCocktails = user.getMyCocktails();
                assertThat(userCocktails).containsExactly(margarita);
        }

        @Test
        void shouldGetFavoriteCocktails() {
                cocktailService.toggleFavoriteCocktail(mojito.getId(), user);
                List<CocktailSummaryDTO> favorites = cocktailService.getMyFavoriteCocktails(user);
                assertThat(favorites).hasSize(1);
                assertThat(favorites.get(0).getName()).isEqualTo("Mojito");
        }
}

package com.cocktail27.api.service;

import com.cocktail27.api.dto.CocktailDTO;
import com.cocktail27.api.dto.CocktailSummaryDTO;
import com.cocktail27.api.dto.RegisterRequest;
import com.cocktail27.api.model.Cocktail;
import com.cocktail27.api.model.Ingredient;
import com.cocktail27.api.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

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

                mojito = Cocktail.builder()
                                .name("Mojito")
                                .description(
                                                "A mojito is a cocktail that consists of five ingredients: white rum, sugar, lime juice, soda water, and mint.")
                                .steps(Arrays.asList("Muddle mint leaves with sugar and lime juice", "Add rum",
                                                "Add ice", "Top with soda water", "Garnish with mint leaves"))
                                .createdBy(admin)
                                .imageUrl("mojito.jpg")
                                .glass("Highball glass")
                                .isAlcoholic(true)
                                .build();

                List<Ingredient> ingMojito = Arrays.asList(
                                Ingredient.builder().name("White rum").quantity("2").cocktail(mojito).build(),
                                Ingredient.builder().name("Sugar").quantity("1").cocktail(mojito).build(),
                                Ingredient.builder().name("Lime juice").quantity("1").cocktail(mojito).build(),
                                Ingredient.builder().name("Soda water").quantity("3").cocktail(mojito).build(),
                                Ingredient.builder().name("Mint").quantity("6").cocktail(mojito).build());

                mojito.setIngredients(ingMojito);

                mojito = cocktailService.createCocktail(mojito);

                margarita = Cocktail.builder()
                                .name("Margarita")
                                .description(
                                                "A margarita is a cocktail consisting of tequila, orange liqueur, and lime juice often served with salt on the rim of the glass.")
                                .steps(Arrays.asList("Shake all ingredients with ice", "Strain into a glass",
                                                "Garnish with a lime wheel"))
                                .createdBy(user)
                                .imageUrl("margarita.jpg")
                                .glass("Margarita glass")
                                .isAlcoholic(true)
                                .build();

                List<Ingredient> ingMargarita = Arrays.asList(
                                Ingredient.builder().name("Tequila").quantity("1/2").cocktail(margarita).build(),
                                Ingredient.builder().name("Orange liqueur").quantity("1/2").cocktail(margarita).build(),
                                Ingredient.builder().name("Lime juice").quantity("1").cocktail(margarita).build());

                margarita.setIngredients(ingMargarita);

                margarita = cocktailService.createCocktail(margarita);
        }

        @Test
        void shouldGetAllCocktails() {
                List<Cocktail> cocktails = cocktailService.getAllCocktails();
                assertThat(cocktails).containsExactly(mojito, margarita);
        }

        @Test
        void shouldSearchCocktailByName() {
                List<Cocktail> foundCocktails = cocktailService.searchCocktails("Mojito");
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

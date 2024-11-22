package com.cocktail27.api.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cocktail27.api.dto.RegisterRequest;
import com.cocktail27.api.mapper.UserMapper;
import com.cocktail27.api.model.Cocktail;
import com.cocktail27.api.model.Ingredient;
import com.cocktail27.api.model.User;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
public class StartupService {
        @Autowired
        private AuthService authService;

        @Autowired
        private UserService userService;

        @Autowired
        private CocktailService cocktailService;

        public void init() {
                log.info("Creating users");
                authService.registerUser(RegisterRequest.builder()
                                .username("admin")
                                .name("Admin")
                                .email("admin@admin.com")
                                .password("admin")
                                .passwordConfirmation("admin")
                                .build());

                User admin = userService.getUserByUsername("admin").get();

                authService.registerUser(RegisterRequest.builder()
                                .username("user")
                                .name("User")
                                .email("user@user.com")
                                .password("user")
                                .passwordConfirmation("user")
                                .build());

                User user = userService.getUserByUsername("user").get();

                log.info("Creating some cocktails");

                Cocktail cocktail1 = Cocktail.builder()
                                .name("Mojito")
                                .description(
                                                "A mojito is a cocktail that consists of five ingredients: white rum, sugar, lime juice, soda water, and mint.")
                                .steps(Arrays.asList("Muddle mint leaves with sugar and lime juice", "Add rum",
                                                "Add ice", "Top with soda water", "Garnish with mint leaves"))
                                .createdBy(admin)
                                .glass("Highball glass")
                                .isAlcoholic(true)
                                .build();

                List<Ingredient> ingredients1 = Arrays.asList(
                                Ingredient.builder().name("White rum").quantity("2").cocktail(cocktail1).build(),
                                Ingredient.builder().name("Sugar").quantity("1").cocktail(cocktail1).build(),
                                Ingredient.builder().name("Lime juice").quantity("1").cocktail(cocktail1).build(),
                                Ingredient.builder().name("Soda water").quantity("3").cocktail(cocktail1).build(),
                                Ingredient.builder().name("Mint").quantity("6").cocktail(cocktail1).build());

                cocktail1.setIngredients(ingredients1);

                cocktail1 = cocktailService.createCocktail(cocktail1);

                Cocktail cocktail2 = Cocktail.builder()
                                .name("Margarita")
                                .description(
                                                "A margarita is a cocktail consisting of tequila, orange liqueur, and lime juice often served with salt on the rim of the glass.")
                                .steps(Arrays.asList("Shake all ingredients with ice", "Strain into a glass",
                                                "Garnish with a lime wheel"))
                                .createdBy(user)
                                .glass("Margarita glass")
                                .isAlcoholic(true)
                                .build();

                List<Ingredient> ingredients2 = Arrays.asList(
                                Ingredient.builder().name("Tequila").quantity("1/2").cocktail(cocktail2).build(),
                                Ingredient.builder().name("Orange liqueur").quantity("1/2").cocktail(cocktail2).build(),
                                Ingredient.builder().name("Lime juice").quantity("1").cocktail(cocktail2).build());

                cocktail2.setIngredients(ingredients2);

                cocktail2 = cocktailService.createCocktail(cocktail2);

                log.info("Checking that the user and cocktails were created");
                admin = userService.getUserByUsername("admin").get();
                log.info("User: {}", UserMapper.userToDTO(admin));
                user = userService.getUserByUsername("user").get();
                log.info("User: {}", UserMapper.userToDTO(user));

                log.info("Cocktail: {}", cocktailService.getCocktailDTO(cocktail1, user));

                log.info("User adds admin's cocktail as a favorite");
                cocktailService.toggleFavoriteCocktail(cocktail1.getId(), user);

                log.info("Checking that the favorite cocktail was added");
                user = userService.getUserByUsername("user").get();
                log.info("User: {}", UserMapper.userToDTO(user));

                log.info("User rates admin's cocktail");
                cocktailService.rateCocktail(cocktail1.getId(), 5L, user);

                log.info("User rates admin's cocktail again");
                cocktailService.rateCocktail(cocktail1.getId(), 4L, user);

                log.info("Checking that the rating was added");
                cocktail1 = cocktailService.getCocktailById(cocktail1.getId()).get();
                user = userService.getUserByUsername("user").get();
                log.info("Cocktail: {}", cocktailService.getCocktailDTO(cocktail1, user));
        }
}

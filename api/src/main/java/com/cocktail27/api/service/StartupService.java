package com.cocktail27.api.service;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cocktail27.api.dto.CocktailCreationDTO;
import com.cocktail27.api.dto.CocktailDTO;
import com.cocktail27.api.dto.RegisterRequest;
import com.cocktail27.api.mapper.UserMapper;
import com.cocktail27.api.model.Cocktail;
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

                CocktailCreationDTO cocktailCreation1 = CocktailCreationDTO.builder()
                                .name("Mojito")
                                .description(
                                                "A mojito is a cocktail that consists of five ingredients: white rum, sugar, lime juice, soda water, and mint.")
                                .ingredients(Arrays.asList("White rum", "Sugar", "Lime juice", "Soda water", "Mint")
                                                .stream()
                                                .collect(Collectors.toMap(ingredient -> ingredient, ingredient -> "1")))
                                .steps(Arrays.asList("Muddle mint leaves with sugar and lime juice", "Add rum",
                                                "Add ice",
                                                "Top with soda water", "Garnish with mint leaves"))
                                .tags(Arrays.asList("mint", "rum", "sugar", "lime", "soda water"))
                                .glass("Highball")
                                .isAlcoholic(true)
                                .build();

                CocktailDTO cocktailDTO1 = cocktailService.createCocktail(cocktailCreation1, admin);

                CocktailCreationDTO cocktailCreation2 = CocktailCreationDTO.builder()
                                .name("Margarita")
                                .description(
                                                "A margarita is a cocktail consisting of tequila, orange liqueur, and lime juice often served with salt on the rim of the glass.")
                                .ingredients(Arrays.asList("Tequila", "Orange liqueur", "Lime juice")
                                                .stream()
                                                .collect(Collectors.toMap(ingredient -> ingredient, ingredient -> "1")))
                                .steps(Arrays.asList(
                                                "Rub the rim of the glass with the lime slice to make the salt stick",
                                                "Take care to moisten only the outer rim and sprinkle the salt on it",
                                                "The salt should present to the lips of the imbiber and never mix into the cocktail",
                                                "Shake the other ingredients with ice, then carefully pour into the glass"))
                                .tags(Arrays.asList("tequila", "orange liqueur", "lime juice", "salt"))
                                .glass("Margarita")
                                .isAlcoholic(true)
                                .build();

                cocktailService.createCocktail(cocktailCreation2, user);

                log.info("Checking that the user and cocktails were created");
                admin = userService.getUserByUsername("admin").get();
                log.info("User: {}", UserMapper.userToDTO(admin));
                user = userService.getUserByUsername("user").get();
                log.info("User: {}", UserMapper.userToDTO(user));

                log.info("Cocktail: {}", cocktailDTO1);

                log.info("User adds admin's cocktail as a favorite");
                cocktailService.toggleFavoriteCocktail(cocktailDTO1.getId(), user);

                log.info("Checking that the favorite cocktail was added");
                user = userService.getUserByUsername("user").get();
                log.info("User: {}", UserMapper.userToDTO(user));

                log.info("User rates admin's cocktail");
                cocktailService.rateCocktail(cocktailDTO1.getId(), 5L, user);

                log.info("User rates admin's cocktail again");
                cocktailService.rateCocktail(cocktailDTO1.getId(), 4L, user);

                log.info("Checking that the rating was added");
                Cocktail cocktail1 = cocktailService.getCocktailById(cocktailDTO1.getId()).get();
                user = userService.getUserByUsername("user").get();
                log.info("Cocktail: {}", cocktailService.getCocktailDTO(cocktail1, user));
        }
}

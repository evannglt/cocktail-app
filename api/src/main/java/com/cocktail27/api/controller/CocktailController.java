package com.cocktail27.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cocktail27.api.dto.CocktailCreationDTO;
import com.cocktail27.api.dto.CocktailDTO;
import com.cocktail27.api.dto.CocktailSummaryDTO;
import com.cocktail27.api.dto.ProfileDTO;
import com.cocktail27.api.dto.SearchCocktailsDTO;
import com.cocktail27.api.model.Cocktail;
import com.cocktail27.api.model.User;
import com.cocktail27.api.service.AuthService;
import com.cocktail27.api.service.CocktailService;
import com.cocktail27.api.service.UserService;

@RestController
@RequestMapping("/api/cocktails")
public class CocktailController {
    @Autowired
    private CocktailService cocktailService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @GetMapping("/my-favorites")
    public ResponseEntity<List<CocktailSummaryDTO>> getMyFavorites() {
        User user = authService.getCurrentUser();
        return ResponseEntity.ok(cocktailService.getFavoriteCocktails(user));
    }

    @GetMapping("/my-cocktails")
    public ResponseEntity<List<CocktailSummaryDTO>> getMyCocktails() {
        User user = authService.getCurrentUser();
        return ResponseEntity.ok(cocktailService.getMyCocktails(user));
    }

    @GetMapping("/randoms")
    public ResponseEntity<List<CocktailSummaryDTO>> getRandomCocktails() {
        User user = authService.getCurrentUser();
        return ResponseEntity.ok(cocktailService.getRandomCocktails(user));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserCocktails(@PathVariable Long id) {
        try {
            User user = authService.getCurrentUser();
            List<CocktailSummaryDTO> cocktailSummaryDTOs = cocktailService.getCocktailsOfUser(id, user);
            User creator = userService.getUserById(id)
                    .orElseThrow(() -> new Exception("User not found"));
            ProfileDTO profileDTO = ProfileDTO.builder()
                    .cocktails(cocktailSummaryDTOs)
                    .username(creator.getUsername())
                    .imageUrl(creator.getImageUrl())
                    .build();
            return ResponseEntity.ok(profileDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCocktail(@PathVariable Long id) {
        try {
            User user = authService.getCurrentUser();
            Cocktail cocktail = cocktailService.getCocktailById(id)
                    .orElseThrow(() -> new Exception("Cocktail not found"));
            CocktailDTO cocktailDTO = cocktailService.getCocktailDTO(cocktail, user);
            return ResponseEntity.ok(cocktailDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/search")
    public ResponseEntity<List<CocktailSummaryDTO>> searchCocktails(
            @RequestBody SearchCocktailsDTO searchCocktailsDTO) {
        User user = authService.getCurrentUser();
        if (searchCocktailsDTO.getQuery().isEmpty()) {
            List<Cocktail> cocktails = cocktailService.getAllCocktails().stream()
                    .limit(15)
                    .toList();

            return ResponseEntity.ok(cocktailService.getCocktailSummaries(cocktails, user));
        }
        return ResponseEntity.ok(cocktailService.searchCocktails(searchCocktailsDTO.getQuery(), user));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCocktail(@RequestBody CocktailCreationDTO cocktailCreationDTO) {
        try {
            User user = authService.getCurrentUser();
            CocktailDTO cocktailDTO = cocktailService.createCocktail(cocktailCreationDTO, user);
            return ResponseEntity.ok(cocktailDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/rate/{id}/{rating}")
    public ResponseEntity<?> rateCocktail(@PathVariable Long id, @PathVariable Long rating) {
        try {
            User user = authService.getCurrentUser();
            CocktailDTO cocktailDTO = cocktailService.rateCocktail(id, rating, user);
            return ResponseEntity.ok(cocktailDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/favorite/{id}")
    public ResponseEntity<?> toggleFavoriteCocktail(@PathVariable Long id) {
        try {
            User user = authService.getCurrentUser();
            CocktailDTO cocktailDTO = cocktailService.toggleFavoriteCocktail(id, user);
            return ResponseEntity.ok(cocktailDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}

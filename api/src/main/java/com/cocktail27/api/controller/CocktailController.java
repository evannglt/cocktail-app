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
import com.cocktail27.api.model.Cocktail;
import com.cocktail27.api.model.User;
import com.cocktail27.api.service.AuthService;
import com.cocktail27.api.service.CocktailService;

@RestController
@RequestMapping("/api/cocktails")
public class CocktailController {
    @Autowired
    private CocktailService cocktailService;

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
            return ResponseEntity.ok(cocktailSummaryDTOs);
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

    @GetMapping("/search/{query}")
    public ResponseEntity<List<CocktailSummaryDTO>> searchCocktails(@PathVariable String query) {
        User user = authService.getCurrentUser();
        return ResponseEntity.ok(cocktailService.searchCocktails(query, user));
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

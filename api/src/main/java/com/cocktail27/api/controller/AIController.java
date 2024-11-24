package com.cocktail27.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cocktail27.api.service.AIService;

@RestController
@RequestMapping("/api/ai")
public class AIController {
    @Autowired
    private AIService aiService;

    @GetMapping("/generate/recipe/{cocktailName}")
    public ResponseEntity<?> generateRecipe(@PathVariable String cocktailName) {
        try {
            return ResponseEntity.ok(aiService.getCocktailRecipe(cocktailName));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}

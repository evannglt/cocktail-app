package com.cocktail27.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.cocktail27.api.dto.CocktailCreationDTO;
import com.cocktail27.api.dto.OllamaRequestDTO;
import com.cocktail27.api.dto.OllamaResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AIService {

    private final RestTemplate restTemplate;

    @Value("${ollama.url}")
    private String ollamaApiUrl;

    @Value("${ollama.model}")
    private String model;

    public AIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void pullModel() {
        String url = ollamaApiUrl + "/api/pull";

        OllamaRequestDTO request = OllamaRequestDTO.builder()
                .model(model)
                .build();

        restTemplate.postForObject(url, request, String.class);
    }

    public String getDescriptionForCocktailName(String cocktailName) {
        String prompt = String.format("Give me a short description of the %s cocktail. It shouldn't exceed 40 words.",
                cocktailName);
        return callOllamaWithStringResponse(prompt);
    }

    public CocktailCreationDTO getCocktailRecipe(String cocktailName) {
        String prompt = String.format(
                "Generate a detailed cocktail recipe JSON for \"%s\". Respond only with a valid JSON object containing the following fields:\n"
                        +
                        "{\n" +
                        "  \"name\": \"string\",\n" +
                        "  \"description\": \"string\",\n" +
                        "  \"ingredients\": {\n" +
                        "    \"ingredient1\": \"amount1\",\n" +
                        "    \"ingredient2\": \"amount2\",\n" +
                        "    ...\n" +
                        "  },\n" +
                        "  \"steps\": [\"step1\", \"step2\", ...],\n" +
                        "  \"tags\": [\"tag1\", \"tag2\", ...],\n" +
                        "  \"glass\": \"string\",\n" +
                        "  \"isAlcoholic\": boolean\n" +
                        "}\n" +
                        "Ensure all fields are populated accurately based on the cocktail. Use precise measurements for ingredients and clear, concise steps. Include relevant tags and specify the appropriate glass. Set isAlcoholic to true if the cocktail contains alcohol, false otherwise.",
                cocktailName);

        String rawResponse = callOllamaWithStringResponse(prompt);
        String cleanedJson = rawResponse.trim()
                .replaceAll("^```json\\s*", "")
                .replaceAll("\\s*```$", "");

        try {
            return new ObjectMapper().readValue(cleanedJson, CocktailCreationDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Error parsing JSON response", e);
        }
    }

    private String callOllamaWithStringResponse(String prompt) {
        String url = ollamaApiUrl + "/api/generate";

        OllamaRequestDTO request = OllamaRequestDTO.builder()
                .prompt(prompt)
                .model(model)
                .stream(false)
                .build();

        OllamaResponseDTO response = restTemplate.postForObject(url, request, OllamaResponseDTO.class);
        return response.getResponse();
    }
}
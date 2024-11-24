package com.cocktail27.api.service;

import com.cocktail27.api.dto.CocktailCreationDTO;
import com.cocktail27.api.dto.CocktailSummaryDTO;
import com.cocktail27.api.dto.ExternalAPIResponse;
import com.cocktail27.api.dto.ExternalCocktailDTO;
import com.cocktail27.api.mapper.CocktailMapper;
import com.cocktail27.api.model.Cocktail;
import com.cocktail27.api.model.User;
import com.cocktail27.api.repository.CocktailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class ExternalAPIService {
    @Autowired
    private CocktailService cocktailService;

    @Autowired
    private CocktailRepository cocktailRepository;

    private static final String API_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";
    private static final String RANDOM_COCKTAIL_ENDPOINT = "/random.php";
    private static final String SEARCH_COCKTAIL_ENDPOINT = "/search.php?s=";

    private final RestTemplate restTemplate;

    public ExternalAPIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void populateDatabase(User user) {
        Set<String> uniqueIds = new HashSet<>();
        int targetCount = 50;

        while (uniqueIds.size() < targetCount) {
            String url = API_BASE_URL + RANDOM_COCKTAIL_ENDPOINT;
            ExternalAPIResponse response = restTemplate.getForObject(url, ExternalAPIResponse.class);

            if (response != null && response.getDrinks() != null && !response.getDrinks().isEmpty()) {
                ExternalCocktailDTO externalCocktailDTO = response.getDrinks().getFirst();

                if (!uniqueIds.contains(externalCocktailDTO.getIdDrink())) {
                    CocktailCreationDTO cocktailCreationDTO =
                            CocktailMapper.ExternalCocktailDTOtoCocktailCreationDTO(externalCocktailDTO);

                    cocktailService.createCocktail(cocktailCreationDTO, user);
                    uniqueIds.add(externalCocktailDTO.getIdDrink());
                }
            }
        }
    }

    public List<CocktailSummaryDTO> searchCocktails(String query, User currentUser) {
        List<ExternalCocktailDTO> externalCocktails = searchCocktails(query);

        // Filter out from externalCocktails the cocktails in our database that have cocktail.getName() == externalCocktail.getStrDrink()
        if(externalCocktails != null) {
            List<Cocktail> cocktailsInDatabase = cocktailRepository.findAllByCocktailDBIdIn(externalCocktails.stream()
                    .map(ExternalCocktailDTO::getIdDrink)
                    .toList()).orElse(List.of());

            externalCocktails.stream()
                    .filter(externalCocktail -> cocktailsInDatabase.stream()
                            .noneMatch(cocktail -> cocktail.getCocktailDBId().equals(Long.valueOf(externalCocktail.getIdDrink()))))
                    .map(CocktailMapper::ExternalCocktailDTOtoCocktailCreationDTO)
                    .forEach(cocktailCreationDTO -> cocktailService.createCocktail(cocktailCreationDTO, currentUser));

        }
        List<Cocktail> cocktails = cocktailRepository.findByNameIgnoreCaseContaining(query);
        return cocktailService.getCocktailSummaries(cocktails, currentUser);
    }

    private List<ExternalCocktailDTO> searchCocktails(String query) {
        String url = API_BASE_URL + SEARCH_COCKTAIL_ENDPOINT + query.toLowerCase();
        ExternalAPIResponse response = restTemplate.getForObject(url, ExternalAPIResponse.class);

        if (response != null && response.getDrinks() != null && !response.getDrinks().isEmpty()) {
            return response.getDrinks();
        }

        return null;
    }
}



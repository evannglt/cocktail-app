package com.cocktail27.api.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.cocktail27.api.dto.CocktailCreationDTO;
import com.cocktail27.api.dto.CocktailDTO;
import com.cocktail27.api.dto.CocktailSummaryDTO;
import com.cocktail27.api.model.Cocktail;
import com.cocktail27.api.model.CocktailRating;
import com.cocktail27.api.model.Ingredient;
import com.cocktail27.api.model.User;
import com.cocktail27.api.repository.CocktailRepository;
import com.cocktail27.api.repository.UserRepository;

@SpringBootTest
@ActiveProfiles("test")
class CocktailServiceTest {

    @InjectMocks
    private CocktailService cocktailService;

    @Mock
    private CocktailRepository cocktailRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthService authService;

    private User mockUser;
    private User mockUser2;
    private List<Cocktail> mockCocktails;
    private Cocktail mockCocktail;
    private Cocktail mockCocktail2;

    @BeforeEach
    void setUp() {
        mockUser = User.builder()
                .id(1L)
                .username("testuser")
                .favoriteCocktails(new ArrayList<>())
                .myCocktails(new ArrayList<>())
                .build();

        mockCocktail = Cocktail.builder()
                .id(1L)
                .name("Test Cocktail")
                .ingredients(Arrays.asList(
                        Ingredient.builder().name("Ingredient1").quantity("1 oz").build(),
                        Ingredient.builder().name("Ingredient2").quantity("2 oz").build()))
                .steps(Arrays.asList("Step 1", "Step 2", "Step 3", "Step 4"))
                .description("Test Description")
                .isAlcoholic(true)
                .imageUrl("test.jpg")
                .tags(Arrays.asList("Tag1", "Tag2"))
                .ratings(Collections.singleton(CocktailRating.builder().rating(5L).build()))
                .createdBy(mockUser)
                .build();

        mockUser2 = User.builder()
                .id(2L)
                .username("testuser2")
                .favoriteCocktails(new ArrayList<>())
                .myCocktails(new ArrayList<>())
                .build();

        mockCocktail2 = Cocktail.builder()
                .id(2L)
                .name("Test Cocktail 2")
                .ingredients(Arrays.asList(
                        Ingredient.builder().name("Ingredient1").quantity("1 oz").build(),
                        Ingredient.builder().name("Ingredient2").quantity("2 oz").build()))
                .steps(Arrays.asList("Step 1", "Step 2", "Step 3", "Step 4"))
                .description("Test Description")
                .isAlcoholic(true)
                .imageUrl("test.jpg")
                .tags(Arrays.asList("Tag1", "Tag2"))
                .ratings(Collections.singleton(CocktailRating.builder().rating(5L).build()))
                .createdBy(mockUser2)
                .build();

        mockCocktails = Arrays.asList(mockCocktail, mockCocktail2);
    }

    @Test
    void testGetAllCocktails() {
        when(cocktailRepository.findAll()).thenReturn(mockCocktails);

        List<Cocktail> result = cocktailService.getAllCocktails();

        assertEquals(mockCocktails, result);
        verify(cocktailRepository).findAll();
    }

    @Test
    void testGetCocktailById_Found() {
        when(cocktailRepository.findById(1L)).thenReturn(Optional.of(mockCocktail));

        Optional<Cocktail> result = cocktailService.getCocktailById(1L);

        assertTrue(result.isPresent());
        assertEquals(mockCocktail, result.get());
        verify(cocktailRepository).findById(1L);
    }

    @Test
    void testGetCocktailById_NotFound() {
        when(cocktailRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Cocktail> result = cocktailService.getCocktailById(1L);

        assertFalse(result.isPresent());
        verify(cocktailRepository).findById(1L);
    }

    @Test
    void testCreateCocktail() {
        when(cocktailRepository.save(any())).thenReturn(mockCocktail);

        CocktailCreationDTO cocktailCreationDTO = CocktailCreationDTO.builder()
                .name("Test Cocktail")
                .description("Test Description")
                .ingredients(new LinkedHashMap<>(Map.of("Ingredient1", "1 oz", "Ingredient2", "2 oz")))
                .steps(Arrays.asList("Step 1", "Step 2", "Step 3", "Step 4"))
                .tags(Arrays.asList("Tag1", "Tag2"))
                .glass("Test Glass")
                .isAlcoholic(true)
                .build();

        CocktailDTO result = cocktailService.createCocktail(cocktailCreationDTO, mockUser);

        assertEquals(result.getName(), mockCocktail.getName());
        assertEquals(result.getId(), mockCocktail.getId());
        verify(cocktailRepository).save(any());
    }

    @Test
    void testUpdateCocktail_Found() {
        when(cocktailRepository.existsById(1L)).thenReturn(true);
        when(cocktailRepository.save(mockCocktail)).thenReturn(mockCocktail);

        Cocktail result = cocktailService.updateCocktail(mockCocktail);

        assertEquals(mockCocktail, result);
        verify(cocktailRepository).save(mockCocktail);
    }

    @Test
    void testUpdateCocktail_NotFound() {
        when(cocktailRepository.existsById(1L)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> cocktailService.updateCocktail(mockCocktail));
        verify(cocktailRepository, never()).save(mockCocktail);
    }

    @Test
    void testGetRandomCocktails() {
        when(cocktailRepository.findAll()).thenReturn(mockCocktails);

        List<CocktailSummaryDTO> result = cocktailService.getRandomCocktails(mockUser);

        assertEquals(mockCocktails.size(), result.size());
        verify(cocktailRepository).findAll();
    }

    @Test
    void testGetMyCocktails() {
        mockUser.setMyCocktails(Arrays.asList(mockCocktail));

        List<CocktailSummaryDTO> result = cocktailService.getMyCocktails(mockUser);

        assertEquals(mockCocktail.getId(), result.get(0).getId());
        assertEquals(1, result.size());
    }

    @Test
    void testGetMyFavoriteCocktails() {
        mockUser.setFavoriteCocktails(Arrays.asList(mockCocktail));

        List<CocktailSummaryDTO> result = cocktailService.getMyFavoriteCocktails(mockUser);

        assertEquals(mockCocktail.getId(), result.get(0).getId());
        assertEquals(1, result.size());
    }

    @Test
    void testGetCocktailsOfUser_Found() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        mockUser.setMyCocktails(Arrays.asList(mockCocktail));

        List<CocktailSummaryDTO> result = cocktailService.getCocktailsOfUser(1L, mockUser);

        assertEquals(mockCocktail.getId(), result.get(0).getId());
        assertEquals(1, result.size());
        verify(userRepository).findById(1L);
    }

    @Test
    void testGetCocktailsOfUser_NotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> cocktailService.getCocktailsOfUser(1L, mockUser));
        verify(userRepository).findById(1L);
    }

    @Test
    void testGetCocktailDTO() {
        CocktailDTO result = cocktailService.getCocktailDTO(mockCocktail, mockUser);

        Map<String, String> expectedIngredients = new LinkedHashMap<>();
        expectedIngredients.put("Ingredient1", "1 oz");
        expectedIngredients.put("Ingredient2", "2 oz");

        List<String> expectedSteps = Arrays.asList("Step 1", "Step 2", "Step 3", "Step 4");

        assertEquals("Test Cocktail", result.getName());
        assertEquals(expectedIngredients, result.getIngredients());
        assertEquals(expectedSteps, result.getSteps());
    }

    @Test
    void testToggleFavoriteCocktail_WhenAlreadyFavorite() {
        mockUser.setFavoriteCocktails(new ArrayList<>(List.of(mockCocktail)));
        when(authService.getCurrentUser()).thenReturn(mockUser);
        when(cocktailRepository.findById(1L)).thenReturn(Optional.of(mockCocktail));

        CocktailDTO result = cocktailService.toggleFavoriteCocktail(1L, mockUser);

        assertFalse(result.getIsFavorite());
        assertFalse(mockUser.getFavoriteCocktails().contains(mockCocktail));
    }

    @Test
    void testToggleFavoriteCocktail_WhenNotFavorite() {
        mockUser.setFavoriteCocktails(new ArrayList<>());
        when(authService.getCurrentUser()).thenReturn(mockUser);
        when(cocktailRepository.findById(1L)).thenReturn(Optional.of(mockCocktail));

        CocktailDTO result = cocktailService.toggleFavoriteCocktail(1L, mockUser);

        assertTrue(result.getIsFavorite());
        assertTrue(mockUser.getFavoriteCocktails().contains(mockCocktail));
    }

    @Test
    void testToggleFavoriteCocktail_WhenCocktailNotFound() {
        when(cocktailRepository.findById(1L)).thenReturn(Optional.empty());
        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> cocktailService.toggleFavoriteCocktail(1L, mockUser));

        assertEquals("Cocktail not found", exception.getMessage());
        verify(userRepository, never()).save(mockUser);
    }

    @Test
    void testToggleFavoriteCocktail_WithLargeFavoritesList() {
        List<Cocktail> largeList = new ArrayList<>();
        for (int i = 10; i < 1000; i++) {
            largeList.add(Cocktail.builder().id((long) i).name("Cocktail " + i).build());
        }
        mockUser.setFavoriteCocktails(largeList);
        when(authService.getCurrentUser()).thenReturn(mockUser);
        when(cocktailRepository.findById(1L)).thenReturn(Optional.of(mockCocktail));

        CocktailDTO result = cocktailService.toggleFavoriteCocktail(1L, mockUser);

        assertTrue(result.getIsFavorite());
        assertTrue(mockUser.getFavoriteCocktails().contains(mockCocktail));
    }
}

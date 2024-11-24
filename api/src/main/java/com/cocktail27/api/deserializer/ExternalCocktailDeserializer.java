package com.cocktail27.api.deserializer;

import com.cocktail27.api.dto.ExternalCocktailDTO;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ExternalCocktailDeserializer extends JsonDeserializer<ExternalCocktailDTO> {

    @Override
    public ExternalCocktailDTO deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        JsonNode node = parser.getCodec().readTree(parser);
        ExternalCocktailDTO.ExternalCocktailDTOBuilder builder = ExternalCocktailDTO.builder();

        // Map simple fields
        builder.idDrink(node.get("idDrink").asText());
        builder.strDrink(node.get("strDrink").asText());
        builder.strDrinkAlternate(node.has("strDrinkAlternate") ? node.get("strDrinkAlternate").asText() : null);
        builder.strTags(node.has("strTags") ? node.get("strTags").asText() : null);
        builder.strVideo(node.has("strVideo") ? node.get("strVideo").asText() : null);
        builder.strCategory(node.has("strCategory") ? node.get("strCategory").asText() : null);
        builder.strIBA(node.has("strIBA") ? node.get("strIBA").asText() : null);
        builder.strInstructions(node.has("strInstructions") ? node.get("strInstructions").asText() : null);
        builder.strInstructionsES(node.has("strInstructionsES") ? node.get("strInstructionsES").asText() : null);
        builder.strInstructionsDE(node.has("strInstructionsDE") ? node.get("strInstructionsDE").asText() : null);
        builder.strInstructionsFR(node.has("strInstructionsFR") ? node.get("strInstructionsFR").asText() : null);
        builder.strInstructionsIT(node.has("strInstructionsIT") ? node.get("strInstructionsIT").asText() : null);
        builder.strInstructionsZH_HANS(node.has("strInstructionsZH_HANS") ? node.get("strInstructionsZH_HANS").asText() : null);
        builder.strInstructionsZH_HANT(node.has("strInstructionsZH_HANT") ? node.get("strInstructionsZH_HANT").asText() : null);
        builder.strGlass(node.has("strGlass") ? node.get("strGlass").asText() : null);
        builder.strAlcoholic(node.has("strAlcoholic") ? node.get("strAlcoholic").asText() : null);
        builder.strDrinkThumb(node.has("strDrinkThumb") ? node.get("strDrinkThumb").asText() : null);
        builder.strImageSource(node.has("strImageSource") ? node.get("strImageSource").asText() : null);
        builder.strImageAttribution(node.has("strImageAttribution") ? node.get("strImageAttribution").asText() : null);
        builder.strCreativeCommonsConfirmed(node.has("strCreativeCommonsConfirmed") ? node.get("strCreativeCommonsConfirmed").asText() : null);
        builder.dateModified(node.has("dateModified") ? node.get("dateModified").asText() : null);

        // Map ingredients and measures
        Map<String, String> ingredientsAndMeasures = new HashMap<>();
        for (int i = 1; i <= 15; i++) {
            String ingredientKey = "strIngredient" + i;
            String measureKey = "strMeasure" + i;

            JsonNode ingredientNode = node.get(ingredientKey);
            JsonNode measureNode = node.get(measureKey);

            if (ingredientNode != null && !ingredientNode.isNull() && !ingredientNode.asText().isEmpty()) {
                String ingredient = ingredientNode.asText();
                String measure = measureNode != null && !measureNode.isNull() ? measureNode.asText() : "";
                ingredientsAndMeasures.put(ingredient, measure);
            }
        }

        builder.ingredientsAndMeasures(ingredientsAndMeasures);

        return builder.build();
    }
}


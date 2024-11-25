import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import CocktailCard from "@/components/CocktailCard";
import { Colors } from "@/constants/Colors";
import { searchCocktailsByName } from "@/services/CocktailService";
import { CocktailSummaryDTO } from "@/interfaces/responses/cocktail";
import { handleLikeCocktail } from "@/utils/cocktail";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  arrowIcon: {
    alignSelf: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: Colors.light.grey,
    borderWidth: 1,
    marginRight: 10,
  },
});

export default function Search() {
  const [query, setQuery] = useState("");
  const [cocktails, setCocktails] = useState<CocktailSummaryDTO[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (query === "") {
        searchCocktailsByName("").then((cocktails) => setCocktails(cocktails));
      }
    }, [query])
  );

  const handleSearchChange = async (text: string) => {
    setQuery(text);
    searchCocktailsByName(text).then((cocktails) => setCocktails(cocktails));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign
            name="arrowleft"
            size={30}
            color="black"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.inputContainer}
          placeholder="Search for cocktails"
          value={query}
          onChangeText={handleSearchChange}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {cocktails.map((item) => (
          <CocktailCard
            name={item.name}
            imageUrl={item.imageUrl}
            creatorImageUrl={item.creatorImageUrl}
            description={item.description}
            onLikePress={() =>
              handleLikeCocktail(item.id, cocktails, setCocktails)
            }
            numberOfReviews={item.numberOfRatings}
            isFavorite={item.isFavorite}
            cocktailId={item.id}
            key={item.id}
          />
        ))}
        {cocktails.length === 0 && query !== "" && (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 18 }}>No results found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

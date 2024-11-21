import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import CocktailCard from "@/components/CocktailCard";
import { Colors } from "@/constants/Colors";

interface SearchProps {
  onRemove: () => void;
}

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

const Search: React.FC<SearchProps> = ({ onRemove }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);
    // Make API call to update list of cocktail
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
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {[...Array(5)].map((_, index) => (
          <CocktailCard
            name="Pornstar Martini"
            image={require("@/assets/images/welcomeImageCocktails.png")}
            description={
              "A delicious cocktail with a hint of passion fruit and vanilla. Perfect for a night out with friends."
            }
            numberOfReviews={34}
            isFavorite={false}
            cocktailId={index}
            key={index}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

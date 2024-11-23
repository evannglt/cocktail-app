import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import MyCocktailCard from "@/components/MyCocktailCard";
import { useCallback, useState } from "react";
import { CocktailSummaryDTO } from "@/interfaces/responses/cocktail";
import { getMyCocktails } from "@/services/CocktailService";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default function MyRecipes() {
  const [cocktails, setCocktails] = useState<CocktailSummaryDTO[]>([]);

  useFocusEffect(
    useCallback(() => {
      getMyCocktails().then((cocktails) => setCocktails(cocktails));
    }, [])
  );

  const handleSearchPressed = (): void => {
    router.push("/(protected)/search");
  };

  const handlePlusPressed = () => {
    router.push("/(protected)/cocktail/create");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 16,
        }}
      >
        <Pressable onPress={handleSearchPressed}>
          <FontAwesome5 name="search" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>My Recipes</Text>
        <Pressable onPress={handlePlusPressed}>
          <FontAwesome5 name="plus" size={24} color="black" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {cocktails.map((item) => (
          <MyCocktailCard
            name={item.name}
            imageUrl={item.imageUrl}
            description={item.description}
            cocktailId={item.id}
            key={item.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CocktailCard from "@/components/CocktailCard";
import { CocktailSummaryDTO } from "@/interfaces/responses/cocktail";
import { getFavoriteCocktails } from "@/services/CocktailService";
import { handleLikeCocktail } from "@/utils/cocktail";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 10,
  },
  arrowIcon: {
    position: "absolute",
    left: 16,
    zIndex: 99,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  noCocktailText: {
    textAlign: "center",
    fontSize: 18,
    alignSelf: "center",
    marginTop: 50,
  },
});

export default function Favorites() {
  const [favoriteCocktails, setFavoriteCocktails] = useState<
    CocktailSummaryDTO[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      getFavoriteCocktails().then((cocktails) =>
        setFavoriteCocktails(cocktails)
      );
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()} style={styles.arrowIcon}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </Pressable>
        <Text style={styles.title}>Favorites</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {favoriteCocktails.length === 0 ? (
          <Text style={styles.noCocktailText}>No favorite cocktail yet</Text>
        ) : (
          favoriteCocktails.map((item) => (
            <CocktailCard
              name={item.name}
              imageUrl={item.imageUrl}
              creatorImageUrl={item.creatorImageUrl}
              onLikePress={() =>
                handleLikeCocktail(
                  item.id,
                  favoriteCocktails,
                  setFavoriteCocktails
                )
              }
              score={item.rating}
              numberOfReviews={item.numberOfRatings}
              isFavorite={item.isFavorite}
              cocktailId={item.id}
              key={item.id}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

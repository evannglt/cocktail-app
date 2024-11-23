import { router, useFocusEffect } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import CocktailCard from "@/components/CocktailCard";
import { Carousel } from "react-native-basic-carousel";
import { CocktailSummaryDTO } from "@/interfaces/responses/cocktail";
import { useCallback, useState } from "react";
import { getRandomCocktails } from "@/services/CocktailService";
import { handleLikeCocktail } from "@/utils/cocktail";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },
});

export default function Index() {
  const [randomCocktails, setRandomCocktails] = useState<CocktailSummaryDTO[]>(
    []
  );

  useFocusEffect(
    useCallback(() => {
      getRandomCocktails().then((cocktails) => {
        setRandomCocktails(cocktails);
      });
    }, [])
  );

  const { width } = Dimensions.get("window");

  const handleSearchPressed = (): void => {
    router.push("/(protected)/search");
  };

  const handleFavoritesPressed = (): void => {
    router.push("/(protected)/favorites");
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
        <Pressable onPress={handleFavoritesPressed}>
          <FontAwesome5 name="heart" size={24} color="black" />
        </Pressable>
      </View>

      <View style={{ width: width, height: 300 }}>
        <Carousel
          data={randomCocktails.slice(0, 5)}
          renderItem={({
            item,
            index,
          }: {
            item: CocktailSummaryDTO;
            index: number;
          }) => (
            <View key={index}>
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: width, height: 275, resizeMode: "cover" }}
              />
            </View>
          )}
          itemWidth={width}
          pagination
          paginationColor={Colors.light.orange}
          autoplay
          autoplayDelay={5000}
          paginationType="circle"
        />
      </View>
      <Text style={styles.title}>Random Cocktails</Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {randomCocktails.map((item) => (
          <CocktailCard
            name={item.name}
            imageUrl={item.imageUrl}
            creatorImageUrl={item.creatorImageUrl}
            onLikePress={() =>
              handleLikeCocktail(item.id, randomCocktails, setRandomCocktails)
            }
            score={item.rating}
            numberOfReviews={item.numberOfRatings}
            isFavorite={item.isFavorite}
            cocktailId={item.id}
            key={item.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

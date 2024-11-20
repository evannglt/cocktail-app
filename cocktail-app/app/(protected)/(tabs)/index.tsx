import { router } from "expo-router";
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
import { Photos } from "@/types/index";

const images: Photos[] = [
  {
    id: 1,
    uri: require("@/assets/images/welcomeImageCocktails.png"),
  },
  {
    id: 2,
    uri: require("@/assets/images/martini.jpg"),
  },
  {
    id: 3,
    uri: require("@/assets/images/welcomeImageCocktails.png"),
  },
  {
    id: 4,
    uri: require("@/assets/images/martini.jpg"),
  },
  {
    id: 5,
    uri: require("@/assets/images/welcomeImageCocktails.png"),
  },
];

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
  const { width } = Dimensions.get("window");

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
        <Pressable onPress={() => console.log("Search pressed")}>
          <FontAwesome5 name="search" size={24} color="black" />
        </Pressable>
        <Pressable onPress={handleFavoritesPressed}>
          <FontAwesome5 name="heart" size={24} color="black" />
        </Pressable>
      </View>

      <View style={{ width: width, height: 300 }}>
        <Carousel
          data={images}
          renderItem={({ item, index }: { item: Photos; index: number }) => (
            <View key={index}>
              <Image
                source={item.uri}
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
        {[...Array(5)].map((_, index) => (
          <CocktailCard
            name="Pornstar Martini"
            image={require("@/assets/images/welcomeImageCocktails.png")}
            score={3.5}
            numberReviews={34}
            isFavorite={false}
            cocktailId={index}
            key={index}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

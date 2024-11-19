import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import MyCocktailCard from "@/components/MyCocktailCard";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default function Index() {
  const handleCocktailPress = (cocktailId: number) => {
    router.push({
      pathname: "/cocktail/[id]",
      params: {
        id: cocktailId,
      },
    });
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
        <Text style={styles.title}>My Recipes</Text>
        <Pressable onPress={() => console.log("Plus pressed")}>
          <FontAwesome5 name="plus" size={24} color="black" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {[...Array(10)].map((_, index) => (
          <TouchableOpacity
            onPress={() => handleCocktailPress(index)}
            activeOpacity={0.5}
            key={index}
          >
            <MyCocktailCard
              name="Pornstar Martini"
              image={require("@/assets/images/welcomeImageCocktails.png")}
              description="The Pornstar Martini blends smooth vanilla vodka with fresh passion fruit, balanced by a hint of lime. It's a vibrant, tropical treat made to impress. Ideal for special occasions or a night in, this cocktail is both bold and sophisticated."
              key={index}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

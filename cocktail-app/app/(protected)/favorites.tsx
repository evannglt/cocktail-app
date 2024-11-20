import React from "react";
import { router } from "expo-router";
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
});

export default function Favorites() {
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
        {[...Array(2)].map((_, index) => (
          <CocktailCard
            name="Pornstar Martini"
            image={require("@/assets/images/welcomeImageCocktails.png")}
            score={2}
            isFavorite={true}
            cocktailId={index}
            key={index}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

import React from "react";
import { router } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";

interface CocktailCardProps {
  name: string;
  imageUrl: string;
  description: string;
  cocktailId: number;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.grey,
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    resizeMode: "cover",
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 5,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 10,
    paddingTop: 15,
  },
  description: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingBottom: 15,
    color: "grey",
    textAlign: "justify",
    overflow: "hidden",
  },
});

const CocktailCard: React.FC<CocktailCardProps> = ({
  name,
  imageUrl,
  description,
  cocktailId,
}) => {
  const handleCocktailPress = (cocktailId: number) => {
    router.push({
      pathname: "/cocktail/[id]",
      params: {
        id: cocktailId,
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={() => handleCocktailPress(cocktailId)}
      activeOpacity={0.5}
      style={styles.card}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CocktailCard;

import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ScoreStars from "@/components/ScoreStars";
import { toggleCocktailFavorites } from "@/services/CocktailService";

interface CocktailCardProps {
  name: string;
  imageUrl: string;
  creatorImageUrl: string;
  isFavorite: boolean;
  onLikePress: () => void;
  score?: number;
  description?: string;
  numberOfReviews: number;
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
    marginRight: 10,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 25,
    resizeMode: "cover",
    margin: 5,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 10,
  },
  stars: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingBottom: 20,
  },
  description: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingBottom: 15,
    color: "grey",
    textAlign: "justify",
    overflow: "hidden",
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

const CocktailCard: React.FC<CocktailCardProps> = ({
  name,
  imageUrl,
  creatorImageUrl,
  isFavorite,
  onLikePress,
  score,
  description,
  numberOfReviews,
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
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: creatorImageUrl }}
          style={styles.profilePicture}
        />
        <View style={styles.info}>
          <Text style={[styles.name, { paddingTop: description ? 15 : 20 }]}>
            {name}
          </Text>
          {score !== undefined ? (
            <ScoreStars score={score} numberOfReviews={numberOfReviews} />
          ) : description ? (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          ) : null}
        </View>
      </View>
      <TouchableOpacity
        onPress={onLikePress}
        style={styles.favoriteIcon}
        activeOpacity={0.5}
      >
        {isFavorite ? (
          <FontAwesome name="heart" size={16} color="red" />
        ) : (
          <FontAwesome5 name="heart" size={16} color={Colors.light.grey} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CocktailCard;

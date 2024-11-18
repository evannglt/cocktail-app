import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ScoreStars from "@/components/ScoreStars";

interface RandomCocktailCardProps {
  name: string;
  image: number;
  score: number;
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
    paddingTop: 20,
  },
  stars: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingBottom: 20,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

const CocktailCard: React.FC<RandomCocktailCardProps> = ({
  name,
  image,
  score,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const onFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.headerContainer}>
        <Image
          source={require("@/assets/images/profile.jpg")}
          style={styles.profilePicture}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <ScoreStars score={score} />
        </View>
      </View>
      <TouchableOpacity
        onPress={onFavoriteToggle}
        style={styles.favoriteIcon}
        activeOpacity={0.5}
      >
        {isFavorite ? (
          <FontAwesome name="heart" size={16} color="red" />
        ) : (
          <FontAwesome5 name="heart" size={16} color={Colors.light.grey} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CocktailCard;

import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import { Chip } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import ScoreStars from "@/components/ScoreStars";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  image: {
    height: 370,
    width: "100%",
    resizeMode: "cover",
  },
  closeIcon: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  scoreContainer: { paddingLeft: 10, height: 40 },
  stars: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingBottom: 20,
  },
  description: {
    fontSize: 14,
    color: "grey",
    alignSelf: "flex-start",
    marginHorizontal: 20,
    marginBottom: 25,
    textAlign: "justify",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  ingredientsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginVertical: 10,
  },
  ingredientList: {
    color: "grey",
    fontSize: 13,
    marginLeft: 20,
    marginBottom: 5,
  },
  mixingButtonContainer: {
    width: "87%",
    backgroundColor: Colors.light.orange,
    borderRadius: 8,
    marginVertical: 5,
    opacity: 1,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  mixingButtonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 15,
  },
});

const CocktailRecipe: React.FC = () => {
  const cocktailId = parseInt(useLocalSearchParams<{ id: string }>().id);

  const [isFavorite, setIsFavorite] = useState(false);

  const alcoholic = true;

  const onFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleStartMixingPress = (cocktailId: number) => {
    router.push({
      pathname: "/step/[id]",
      params: {
        id: cocktailId,
      },
    });
  };

  const handleUserPress = (userId: number) => {
    router.push({
      pathname: "/user/[id]",
      params: {
        id: userId,
      },
    });
  };

  const cocktail = {
    photo: require("@/assets/images/martini.jpg"),
    score: 4.5,
    name: "Mocktail Delight",
    description:
      "The Martini blends smooth vanilla vodka with fresh passion fruit, balanced by a hint of lime. It's a vibrant, tropical treat made to impress. Ideal for special occasions or a night in, this cocktail is both bold and sophisticated. The Pornstar Martini blends smooth vanilla vodka with fresh passion fruit, balanced by a hint of lime. It's a vibrant, tropical treat made to impress. Ideal for special occasions or a night in, this cocktail is both bold and sophisticated.",
    ingredients: {
      "Vanilla Vodka": "25 mL",
      Passoa: "15 mL",
      "Passion Fruit purée": "30 mL",
      "Lime juice": "15 mL",
      "Vanilla Syrup": "10 mL",
      "Fresh passion fruit": "1/2",
    },
    tags: ["IPA", "Sour", "Fruity", "ContemporaryClassic"],
    numberOfReviews: 234,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: "relative" }}>
        <Image style={styles.image} source={cocktail.photo} />

        <Pressable onPress={() => router.back()} style={styles.closeIcon}>
          <AntDesign name="close" size={30} color={Colors.light.grey} />
        </Pressable>
      </View>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleUserPress(1)}
        >
          <Image
            source={require("@/assets/images/profile.jpg")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 25,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>{cocktail.name}</Text>
            <TouchableOpacity onPress={onFavoriteToggle} activeOpacity={0.5}>
              {isFavorite ? (
                <FontAwesome name="heart" size={20} color="red" />
              ) : (
                <FontAwesome5
                  name="heart"
                  size={20}
                  color={Colors.light.grey}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.scoreContainer}>
            <ScoreStars
              score={cocktail.score}
              numberOfReviews={cocktail.numberOfReviews}
              pressable
            />
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.tagsContainer}>
          {cocktail.tags.map((tag, index) => (
            <Chip
              key={index}
              style={{
                backgroundColor: Colors.light.orange,
                margin: 2,
                borderRadius: 15,
              }}
              textStyle={{ color: "white" }}
            >
              {tag}
            </Chip>
          ))}
          {alcoholic ? (
            <Chip
              style={{
                backgroundColor: Colors.light.pastelRed,
                margin: 2,
                borderRadius: 15,
              }}
              textStyle={{ color: "white" }}
            >
              Alcoholic
            </Chip>
          ) : (
            <Chip
              style={{
                backgroundColor: Colors.light.pastelGreen,
                margin: 2,
                borderRadius: 15,
              }}
              textStyle={{ color: "white" }}
            >
              Non-Alcoholic
            </Chip>
          )}
        </View>

        <Text style={styles.description}>{cocktail.description}</Text>

        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        {Object.entries(cocktail.ingredients).map(
          ([ingredient, amount]: [string, string], index: number) => (
            <Text key={index} style={styles.ingredientList}>
              • {amount} {ingredient}
            </Text>
          )
        )}
      </ScrollView>
      <Pressable
        onPress={() => handleStartMixingPress(cocktailId)}
        style={styles.mixingButtonContainer}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome6 name="martini-glass-citrus" size={17} color={"white"} />
          <Text style={styles.mixingButtonText}>Start Mixing</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default CocktailRecipe;

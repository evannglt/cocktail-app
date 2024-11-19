import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
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
  ingredientsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
  },
  ingredientsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ingredientsSubtitle: {
    fontSize: 13,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 4,
  },
  ingredientColumn: {
    width: "48%",
  },
  ingredientList: {
    color: "grey",
    fontSize: 13,
    marginLeft: 20,
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
      /*pathname: "/user/[id]",*/ // placeholder, to be called when user profile is implemented
      pathname: "/(protected)/(tabs)/my-recipes",
      /*params: {
        id: userId,
      },*/ // placeholder, to be called when user profile is implemented
    });
  };

  const cocktail = {
    photo: require("@/assets/images/martini.jpg"),
    score: 4.5,
    name: "Mocktail Delight",
    description:
      "The Martini blends smooth vanilla vodka with fresh passion fruit, balanced by a hint of lime. It's a vibrant, tropical treat made to impress. Ideal for special occasions or a night in, this cocktail is both bold and sophisticated. The Pornstar Martini blends smooth vanilla vodka with fresh passion fruit, balanced by a hint of lime. It's a vibrant, tropical treat made to impress. Ideal for special occasions or a night in, this cocktail is both bold and sophisticated.",
    ingredients: {
      alcohol: ["25 ml Vanilla Vodka", "15 ml Passoa"],
      juice: [
        "30 ml Passion Fruit purée",
        "15 ml Lime juice",
        "10 ml Vanilla Syrup",
      ],
      garnish: ["Half a fresh passion fruit"],
    },
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
          <View style={{ paddingLeft: 10 }}>
            <ScoreStars score={cocktail.score} />
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.description}>{cocktail.description}</Text>

        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        <View style={styles.ingredientsContainer}>
          <View style={styles.ingredientColumn}>
            <Text style={styles.ingredientsSubtitle}>Alcohol:</Text>
            {cocktail.ingredients.alcohol.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientList}>
                • {ingredient}
              </Text>
            ))}
            <Text style={styles.ingredientsSubtitle}>Juice:</Text>
            {cocktail.ingredients.juice.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientList}>
                • {ingredient}
              </Text>
            ))}
          </View>
          <View style={styles.ingredientColumn}>
            <Text style={styles.ingredientsSubtitle}>Garnish:</Text>
            {cocktail.ingredients.garnish.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientList}>
                • {ingredient}
              </Text>
            ))}
          </View>
        </View>
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

import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  Pressable,
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
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
import { CocktailDTO } from "@/interfaces/responses/cocktail";
import {
  getCocktailById,
  rateCocktail,
  toggleCocktailFavorites,
} from "@/services/CocktailService";

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
  const [cocktail, setCocktail] = useState<CocktailDTO | null>(null);

  useFocusEffect(
    useCallback(() => {
      getCocktailById(cocktailId).then((cocktailResult) => {
        setCocktail(cocktailResult);
      });
    }, [cocktailId])
  );

  const onFavoriteToggle = () => {
    toggleCocktailFavorites(cocktailId).then((isFavorite) => {
      cocktail && setCocktail({ ...cocktail, isFavorite });
    });
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

  const handleStarPress = (starNumber: number) => {
    Alert.alert(
      "Review",
      `Do you want to leave a review of ${starNumber}/5 for this cocktail?`,
      [
        {
          text: "Yes",
          onPress: async () => {
            await rateCocktail(cocktailId, starNumber);
            const updatedCocktail = await getCocktailById(cocktailId);
            setCocktail(updatedCocktail);
          },
        },
        {
          text: "No",
          onPress: () => console.log("No review"),
          style: "cancel",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: "relative" }}>
        <Image style={styles.image} source={{ uri: cocktail?.imageUrl }} />

        <Pressable onPress={() => router.back()} style={styles.closeIcon}>
          <AntDesign name="close" size={30} color={Colors.light.grey} />
        </Pressable>
      </View>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleUserPress(cocktail?.creatorId || 0)}
        >
          <Image
            source={{ uri: cocktail?.creatorImageUrl }}
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
            <Text style={styles.title}>{cocktail?.name}</Text>
            <TouchableOpacity onPress={onFavoriteToggle} activeOpacity={0.5}>
              {cocktail?.isFavorite ? (
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
              score={cocktail?.rating || 0}
              numberOfReviews={cocktail?.numberOfRatings || 0}
              onStarPress={handleStarPress}
            />
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.tagsContainer}>
          {cocktail?.tags
            .filter((tag) => tag !== "null")
            .map((tag, index) => (
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
          {cocktail?.isAlcoholic ? (
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

        <Text style={styles.description}>{cocktail?.description}</Text>

        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        {Object.entries(cocktail?.ingredients || {}).map(
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

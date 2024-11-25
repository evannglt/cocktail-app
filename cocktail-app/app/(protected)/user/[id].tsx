import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import CocktailCard from "@/components/CocktailCard";
import { AntDesign } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { CocktailSummaryDTO } from "@/interfaces/responses/cocktail";
import { getUserCocktails } from "@/services/CocktailService";
import { handleLikeCocktail } from "@/utils/cocktail";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 10,
  },
  closeIcon: {
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
  image: {
    width: 165,
    height: 165,
    marginTop: 20,
    borderRadius: 4,
    alignSelf: "center",
    resizeMode: "cover",
  },
  subtitle: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },
});

const UserRecipes: React.FC = () => {
  const userId = parseInt(useLocalSearchParams<{ id: string }>().id);
  const [profile, setProfile] = useState<{
    username: string;
    imageUrl: string;
  } | null>(null);
  const [cocktails, setCocktails] = useState<CocktailSummaryDTO[]>([]);

  useFocusEffect(
    useCallback(() => {
      getUserCocktails(userId).then((data) => {
        setProfile({
          username: data?.username || "",
          imageUrl: data?.imageUrl || "",
        });
        setCocktails(data?.cocktails || []);
      });
    }, [userId])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()} style={styles.closeIcon}>
          <AntDesign name="close" size={30} color="black" />
        </Pressable>
        <Text style={styles.title}>{profile?.username}</Text>
      </View>

      <Image style={styles.image} source={{ uri: profile?.imageUrl }} />
      <Text style={styles.subtitle}>{profile?.username}'s Recipes</Text>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {cocktails.map((item) => (
          <CocktailCard
            name={item.name}
            imageUrl={item.imageUrl}
            creatorImageUrl={item.creatorImageUrl}
            onLikePress={() =>
              handleLikeCocktail(item.id, cocktails, setCocktails)
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
};

export default UserRecipes;

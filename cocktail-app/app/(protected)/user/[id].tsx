import { router } from "expo-router";
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import CocktailCard from "@/components/CocktailCard";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const username = "user1234";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()} style={styles.closeIcon}>
          <AntDesign name="close" size={30} color="black" />
        </Pressable>
        <Text style={styles.title}>{username}</Text>
      </View>

      <Image
        style={styles.image}
        source={require("@/assets/images/profile.jpg")}
      />
      <Text style={styles.subtitle}>{username}'s Recipes</Text>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {[...Array(10)].map((_, index) => (
          <CocktailCard
            name="Pornstar Martini"
            image={require("@/assets/images/welcomeImageCocktails.png")}
            score={3}
            isFavorite={false}
            cocktailId={index}
            key={index}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserRecipes;

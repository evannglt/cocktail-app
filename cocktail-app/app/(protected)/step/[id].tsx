import { router, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

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
  arrowIcon: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  stepNumber: {
    fontSize: 30,
    fontFamily: "Baskerville-Italic",
    paddingRight: 20,
    alignSelf: "center",
    color: Colors.light.pastelOrange,
  },
  text: {
    fontSize: 14,
    alignSelf: "center",
    color: "grey",
    flexWrap: "wrap",
    flexShrink: 1,
    textAlign: "justify",
  },
  glassText: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "justify",
  },
  glassContainer: { flexDirection: "row", marginBottom: 30 },
  glassIcon: {
    paddingHorizontal: 15,
    alignSelf: "center",
  },
});

const CocktailSteps: React.FC = () => {
  const cocktailId = parseInt(useLocalSearchParams<{ id: string }>().id);

  const mockCocktail = {
    steps: [
      "Add vanilla vodka, Passoã (or any other passion fruit liqueur), passion fruit purée, lime juice and vanilla syrup to a shaker filled with ice.",
      "Secure the lid and shake vigorously for about 15 seconds.",
      "Strain the mixture into a chilled martini to remove any ice or pulp.",
      "Garnish with half a passion fruit on top of it.",
      "Enjoy!",
    ],
    glass: "Cocktail glass",
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: "relative" }}>
        <Image
          style={styles.image}
          source={require("@/assets/images/martini.jpg")}
        />

        <Pressable onPress={() => router.back()} style={styles.arrowIcon}>
          <AntDesign name="arrowleft" size={30} color={Colors.light.grey} />
        </Pressable>
      </View>

      <Text style={styles.title}>Steps</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.glassContainer}>
          <MaterialCommunityIcons
            name="glass-cocktail"
            size={25}
            style={styles.glassIcon}
            color={Colors.light.pastelOrange}
          />
          <Text style={styles.glassText}>{mockCocktail.glass}</Text>
        </View>
        {mockCocktail.steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.text}>{step}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CocktailSteps;

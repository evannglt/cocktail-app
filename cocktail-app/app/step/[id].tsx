import { router, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
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
  stepText: {
    fontSize: 14,
    alignSelf: "center",
    color: "grey",
    flexWrap: "wrap",
    flexShrink: 1,
    textAlign: "justify",
  },
});

const CocktailSteps: React.FC = () => {
  const handlePress = async () => {
    router.replace("/(auth)/log-in");
  };

  const cocktailId = parseInt(useLocalSearchParams<{ id: string }>().id);

  const mockSteps = [
    {
      number: 1,
      content:
        "Add vanilla vodka, Passoã (or any other passion fruit liqueur), passion fruit purée, lime juice and vanilla syrup to a shaker filled with ice.",
    },
    {
      number: 2,
      content: "Secure the lid and shake vigorously for about 15 seconds.",
    },
    {
      number: 3,
      content:
        "Strain the mixture into a chilled martini to remove any ice or pulp.",
    },
    {
      number: 4,
      content: "Garnish with half a passion fruit on top of it.",
    },
    {
      number: 5,
      content: "Enjoy!",
    },
  ];

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
        {mockSteps.map((step) => (
          <View key={step.number} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{step.number}</Text>
            <Text style={styles.stepText}>{step.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CocktailSteps;

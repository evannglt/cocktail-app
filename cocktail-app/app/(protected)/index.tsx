import api from "@/services/api";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const handlePress = async () => {
    await api.clearAuthToken();
    router.replace("/(auth)/log-in");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hi! 👋</Text>
      <Pressable onPress={handlePress}>
        <Text
          style={{
            color: "blue",
            textDecorationLine: "underline",
          }}
        >
          Log In
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

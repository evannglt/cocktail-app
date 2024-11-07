import { Stack } from "expo-router";
import "react-native-reanimated";
import "@/services/api";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

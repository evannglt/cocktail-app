import { Stack } from "expo-router";
import React from "react";
import "react-native-reanimated";
import "@/services/api";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(protected)" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

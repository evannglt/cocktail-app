import { Tabs, router } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import api from "@/services/api";
import { useEffect } from "react";

export default function TabLayout() {
  useEffect(() => {
    (async () => {
      const token = await api.getAuthToken();
      if (!token) {
        router.replace("/(auth)/log-in");
      }
    })();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

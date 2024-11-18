import { Tabs, router } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useEffect, useState } from "react";
import { validateToken } from "@/services/AuthService";

export default function TabLayout() {
  /**
   * This state allows to prevent index to be
   * quickly rendered a first time before
   * auth state is determined
   */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateToken().then((isValid) => {
      if (!isValid) {
        router.replace("/(auth)/log-in");
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

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

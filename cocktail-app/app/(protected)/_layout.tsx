import { Tabs, router } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
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
        tabBarActiveTintColor: Colors.light.orange,
        tabBarInactiveTintColor: Colors.light.grey,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"compass"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-recipes"
        options={{
          title: "My Recipes",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"glass-martini-alt"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"user-alt"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

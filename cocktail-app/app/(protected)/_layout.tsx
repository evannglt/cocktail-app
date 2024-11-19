import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { validateToken } from "@/services/AuthService";

export default function AuthLayout() {
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
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

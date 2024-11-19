import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import KeyboardAvoidingScrollLayout from "@/layout/KeyboardAvoidingScrollLayout";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import TextInputComponent from "@/components/TextInputComponent";
import { login } from "@/services/AuthService";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    minHeight: "100%",
  },
  image: {
    width: "100%",
    height: "35%",
    resizeMode: "cover",
    top: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 15,
  },
  forgotPasswordButton: {
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 10,
    fontSize: 16,
  },
  forgotPasswordButtonText: {
    color: Colors.light.orange,
  },
  loginButtonContainer: {
    width: "87%",
    backgroundColor: Colors.light.orange,
    borderRadius: 8,
    marginTop: 20,
    opacity: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  registerTextContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  regularText: {
    color: Colors.light.grey,
  },
  registerText: {
    color: Colors.light.orange,
    marginLeft: 5,
  },
});

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLogInEnabled = () => {
    return username.trim() !== "" && password.trim() !== "";
  };

  const handlePress = async () => {
    login({ username, password }).then(
      (success) => success && router.replace("/(protected)/(tabs)")
    );
  };

  const handleRegisterPress = () => {
    router.replace("/(auth)/sign-up");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/welcomeImageCocktails.png")}
      />

      <Text style={styles.title}>Welcome!</Text>
      <TextInputComponent
        placeholder="Username"
        value={username}
        onChange={setUsername}
      />
      <TextInputComponent
        placeholder="Password"
        value={password}
        onChange={setPassword}
        isSecure
      />

      <Pressable
        onPress={handleRegisterPress}
        style={styles.forgotPasswordButton}
      >
        <Text style={styles.forgotPasswordButtonText}>Forgot password?</Text>
      </Pressable>
      <Pressable
        onPress={handlePress}
        style={[
          styles.loginButtonContainer,
          { opacity: isLogInEnabled() ? 1 : 0.5 },
        ]}
        disabled={!isLogInEnabled()}
      >
        <Text style={styles.loginButtonText}>Log in</Text>
      </Pressable>
      <View style={styles.registerTextContainer}>
        <Text style={styles.regularText}>Not a member?</Text>
        <Pressable onPress={handleRegisterPress}>
          <Text style={styles.registerText}>Register now</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default KeyboardAvoidingScrollLayout(LogIn);

import { Pressable, View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import KeyboardAvoidingScrollLayout from "@/layout/KeyboardAvoidingScrollLayout";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";
import api from "@/services/api";
import { router } from "expo-router";
import TextInputComponent from "@/components/TextInputComponent";
import { register } from "@/services/AuthService";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "grey",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginBottom: 25,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 10,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 15,
    width: "87%",
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.light.grey,
    borderRadius: 4,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  termsTextContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  signUpButtonContainer: {
    width: "87%",
    backgroundColor: Colors.light.orange,
    borderRadius: 8,
    marginTop: 20,
    opacity: 1,
  },
  signUpButtonText: {
    color: "white",
    textAlign: "center",
    padding: 15,
  },
  logInTextContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  regularText: {
    color: "grey",
  },
  pressableText: {
    color: Colors.light.orange,
    marginLeft: 3,
    marginRight: 3,
  },
});

function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const isSignUpEnabled = () => {
    return (
      name.trim() !== "" &&
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      isCheckboxChecked
    );
  };

  const handleSignUpPress = async () => {
    register({
      name,
      username,
      email,
      password,
      passwordConfirmation: confirmPassword,
    }).then((success) => {
      if (success) {
        console.error("Registration successful");
        router.replace("/(auth)/log-in");
      }
    });
  };

  const handleLogInPress = () => {
    router.replace("/(auth)/log-in");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Create an account to get started</Text>

      <Text style={styles.inputTitle}>Name</Text>
      <TextInputComponent placeholder="Name" value={name} onChange={setName} />

      <Text style={styles.inputTitle}>Username</Text>
      <TextInputComponent
        placeholder="Username"
        value={username}
        onChange={setUsername}
      />

      <Text style={styles.inputTitle}>Email Address</Text>
      <TextInputComponent
        placeholder="name@email.com"
        value={email}
        onChange={setEmail}
      />

      <Text style={styles.inputTitle}>Password</Text>
      <TextInputComponent
        placeholder="Create a password"
        value={password}
        onChange={setPassword}
        isSecure
      />
      <TextInputComponent
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        isSecure
      />

      <View style={styles.termsContainer}>
        <Pressable
          style={styles.checkbox}
          onPress={() => setIsCheckboxChecked(!isCheckboxChecked)}
        >
          {isCheckboxChecked && (
            <Icon name="check" size={16} color={Colors.light.orange} />
          )}
        </Pressable>
        <View style={styles.termsTextContainer}>
          <Text style={styles.regularText}>I've read and agree with the</Text>
          <Pressable>
            <Text style={styles.pressableText}>Terms and Conditions</Text>
          </Pressable>
          <Text style={styles.regularText}>and the</Text>
          <Pressable>
            <Text style={styles.pressableText}>Privacy Policy</Text>
          </Pressable>
          <Text style={[styles.regularText, { marginLeft: -3 }]}>.</Text>
        </View>
      </View>

      <Pressable
        onPress={handleSignUpPress}
        style={[
          styles.signUpButtonContainer,
          { opacity: isSignUpEnabled() ? 1 : 0.5 },
        ]}
        disabled={!isSignUpEnabled()}
      >
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </Pressable>

      <View style={styles.logInTextContainer}>
        <Text style={styles.regularText}>Already have an account?</Text>
        <Pressable onPress={handleLogInPress}>
          <Text style={styles.pressableText}>Log in</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default KeyboardAvoidingScrollLayout(SignUp);

import { View, Pressable, Text, TextInput, StyleSheet } from "react-native";
import KeyboardAvoidingScrollLayout from "@/layout/KeyboardAvoidingScrollLayout";
import api from "@/services/api";
import { router } from "expo-router";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: 200,
    height: 40,
    padding: 10,
    margin: 10,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

function LogIn() {
  const handlePress = async () => {
    await api.setAuthToken("token");
    router.replace("/(protected)/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TextInput style={styles.input} placeholder="Additional Info" />
      <TextInput style={styles.input} placeholder="Additional Info" />
      <Pressable onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Go to home</Text>
      </Pressable>
    </View>
  );
}

export default KeyboardAvoidingScrollLayout(LogIn);

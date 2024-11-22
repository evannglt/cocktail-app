import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import KeyboardAvoidingScrollLayout from "@/layout/KeyboardAvoidingScrollLayout";
import { Colors } from "@/constants/Colors";
import TextInputComponent from "@/components/TextInputComponent";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    flex: 1,
    alignItems: "center",
  },
  subcontainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 10,
  },
  closeIcon: {
    position: "absolute",
    left: 16,
    zIndex: 99,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  image: {
    width: 165,
    height: 165,
    marginTop: 20,
    borderRadius: 4,
    resizeMode: "cover",
  },
  changePicture: {
    marginTop: 10,
    marginBottom: 30,
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: 800,
    color: Colors.light.orange,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.light.grey,
    width: "85%",
    marginVertical: 20,
  },
  saveChangesButtonContainer: {
    width: "87%",
    backgroundColor: Colors.light.orange,
    borderRadius: 8,
    marginBottom: 25,
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
  saveChangesButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    padding: 15,
  },
});

const user = {
  name: "User Name",
  username: "user1234",
  email: "test@email.com",
};

const EditProfile: React.FC = () => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isSaveChangesEnabled = () => {
    const isProfileInfoValid =
      name.trim() !== "" && username.trim() !== "" && email.trim() !== "";
    const isPasswordValid =
      (password.trim() === "" && confirmPassword.trim() === "") ||
      (password.trim() !== "" && confirmPassword.trim() !== "");

    return isProfileInfoValid && isPasswordValid;
  };

  const handleSaveChanges = async () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => router.back()} style={styles.closeIcon}>
            <AntDesign name="close" size={30} color="black" />
          </Pressable>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        <Image
          style={styles.image}
          source={require("@/assets/images/profile2.png")}
        />
        <Pressable onPress={() => console.log("Change picture clicked")}>
          <Text style={styles.changePicture}>Change Picture</Text>
        </Pressable>

        <TextInputComponent
          placeholder="Name"
          value={name}
          onChange={setName}
        />
        <TextInputComponent
          placeholder="Username"
          value={username}
          onChange={setUsername}
        />
        <TextInputComponent
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />

        <View style={styles.separator} />

        <TextInputComponent
          placeholder="Password"
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
      </View>

      <Pressable
        onPress={handleSaveChanges}
        style={[
          styles.saveChangesButtonContainer,
          { opacity: isSaveChangesEnabled() ? 1 : 0.5 },
        ]}
        disabled={!isSaveChangesEnabled()}
      >
        <Text style={styles.saveChangesButtonText}>Save Changes</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingScrollLayout(EditProfile);

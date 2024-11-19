import { router } from "expo-router";
import { logout } from "@/services/AuthService";
import { Colors } from "@/constants/Colors";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  title: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    padding: 15,
  },
  subcontainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 165,
    height: 165,
    borderRadius: 4,
    resizeMode: "cover",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 15,
    marginBottom: 50,
  },
  profileOptionContainer: {
    width: "87%",
    backgroundColor: Colors.light.buttonGrey,
    borderRadius: 8,
    marginBottom: 25,
    padding: 7,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  profileOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  icon: { position: "absolute", left: 10 },
  profileOptionText: {
    flex: 1,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 10,
  },
  logOutButtonContainer: {
    width: "87%",
    backgroundColor: Colors.light.orange,
    borderRadius: 8,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  logOutButtonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 15,
  },
});

export default function Profile() {
  const handleLogOutPress = async () => {
    logout().then(() => router.replace("/(auth)/log-in"));
  };

  const handleEditProfilePress = () => {
    router.push("/edit-profile");
  };

  const handleSettingsPress = () => {
    router.push("/settings");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>My Profile</Text>
        <Image
          style={styles.image}
          source={require("@/assets/images/profile2.png")}
        />
        <Text style={styles.name}>user1234</Text>
        <TouchableOpacity
          onPress={handleEditProfilePress}
          activeOpacity={0.5}
          style={styles.profileOptionContainer}
        >
          <View style={styles.profileOptionContent}>
            <Feather name="edit-3" size={20} style={styles.icon} />
            <Text style={styles.profileOptionText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSettingsPress}
          activeOpacity={0.5}
          style={styles.profileOptionContainer}
        >
          <View style={styles.profileOptionContent}>
            <Feather name="settings" size={20} style={styles.icon} />
            <Text style={styles.profileOptionText}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Pressable
        onPress={() => handleLogOutPress()}
        style={styles.logOutButtonContainer}
      >
        <Text style={styles.logOutButtonText}>Log Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

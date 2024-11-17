import React, { useState } from "react";
import { TextInput, View, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";

interface TextInputComponentProps {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  isSecure?: boolean;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  placeholder,
  value,
  onChange,
  isSecure = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(isSecure);

  const handleToggleVisibility = () => {
    setSecureTextEntry((prev) => !prev);
  };

  return (
    <View style={isSecure ? styles.inputContainer : styles.inputContainerBis}>
      <TextInput
        style={[
          styles.input,
          { borderColor: focused ? Colors.light.orange : Colors.light.grey },
        ]}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {isSecure && (
        <Pressable
          onPress={handleToggleVisibility}
          style={styles.passwordVisibilityIcon}
        >
          <Icon
            name={secureTextEntry ? "eye" : "eye-off"}
            size={20}
            color={Colors.light.grey}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    width: "92%",
  },
  inputContainerBis: {
    width: "92%",
  },
  input: {
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 40,
    margin: 10,
    borderRadius: 8,
  },
  passwordVisibilityIcon: {
    position: "absolute",
    right: "5%",
    top: "30%",
  },
});

export default TextInputComponent;

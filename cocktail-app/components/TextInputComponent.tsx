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
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: focused ? Colors.light.orange : Colors.light.grey,
        },
      ]}
    >
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.grey}
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
    width: "92%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
  },
  passwordVisibilityIcon: {},
});

export default TextInputComponent;

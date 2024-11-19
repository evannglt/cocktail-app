import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface MultilineTextInputComponentProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  height?: number;
}

const TextInputComponent: React.FC<MultilineTextInputComponentProps> = ({
  title,
  placeholder,
  value,
  onChange,
  height = 30,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <Text style={styles.inputTitle}>{title}</Text>

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: focused ? Colors.light.orange : Colors.light.grey,
            height: height,
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.light.grey}
          value={value}
          onChangeText={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          multiline={true}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "87%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 8,
    height: 30,
    paddingLeft: 10,
    paddingRight: 40,
    margin: 10,
  },
  input: {
    flex: 1,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 10,
  },
});

export default TextInputComponent;

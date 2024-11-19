import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface StepInputProps {
  number: number;
  value: string;
  secondaryInput?: boolean;
  secondaryValue?: string;
  onSecondaryChange?: (text: string) => void;
  onChange: (text: string) => void;
  onRemove: () => void;
}

const StepInput: React.FC<StepInputProps> = ({
  number,
  value,
  secondaryInput = false,
  secondaryValue = "",
  onSecondaryChange,
  onChange,
  onRemove,
}) => {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepLabel}>{number}</Text>
      {secondaryInput && (
        <TextInput
          style={styles.secondaryInput}
          placeholder={`Qty`}
          value={secondaryValue}
          onChangeText={onSecondaryChange}
        />
      )}
      <TextInput
        style={styles.stepInput}
        placeholder={`Description`}
        value={value}
        onChangeText={onChange}
        multiline
      />
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <AntDesign name="minuscircleo" size={16} color={Colors.light.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 30,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 8,
  },
  stepInput: {
    flex: 1,
    fontSize: 12,
    borderWidth: 1,
    borderColor: Colors.light.grey,
    padding: 8,
    borderRadius: 8,
  },
  secondaryInput: {
    flex: 0.3,
    fontSize: 12,
    borderWidth: 1,
    borderColor: Colors.light.grey,
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  removeButton: {
    marginLeft: 10,
  },
});

export default StepInput;

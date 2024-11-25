import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ElementInput from "./ElementInput";

interface DynamicTextInputProps {
  title: string;
  items: string[];
  secondaryItems?: string[];
  onAdd?: () => void;
  onChange: (index: number, text: string) => void;
  onSecondaryChange?: (index: number, text: string) => void;
  onRemove: (index: number) => void;
}

const DynamicTextInput: React.FC<DynamicTextInputProps> = ({
  title,
  items,
  secondaryItems,
  onAdd,
  onChange,
  onSecondaryChange,
  onRemove,
}) => {
  return (
    <View>
      <Text style={styles.inputTitle}>{title}s</Text>
      <View>
        {items.map((item, index) => (
          <ElementInput
            key={index}
            number={index + 1}
            value={item}
            secondaryInput={!!secondaryItems}
            secondaryValue={secondaryItems ? secondaryItems[index] : undefined}
            onSecondaryChange={
              onSecondaryChange
                ? (text) => onSecondaryChange(index, text)
                : undefined
            }
            onChange={(text) => onChange(index, text)}
            onRemove={() => onRemove(index)}
          />
        ))}

        <TouchableOpacity
          onPress={onAdd}
          activeOpacity={0.5}
          style={styles.addButton}
        >
          <AntDesign name="pluscircleo" size={16} color={Colors.light.orange} />
          <Text style={styles.addText}>Add another {title.toLowerCase()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  addText: {
    fontSize: 14,
    color: Colors.light.orange,
    marginLeft: 8,
  },
});

export default DynamicTextInput;

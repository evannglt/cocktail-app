import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface PressableOrNotStarProps {
  iconName: React.ComponentProps<typeof FontAwesome>["name"];
  starNumber: number;
  pressable: boolean;
  size?: number;
  color?: string;
}

const PressableOrNotStar: React.FC<PressableOrNotStarProps> = ({
  iconName,
  starNumber,
  pressable,
  size = 18,
  color = Colors.light.star,
}) => {
  const handleStarPress = (starNumber: number) => {
    Alert.alert(
      "Review",
      `Do you want to leave a review of ${starNumber}/5 for this cocktail?`,
      [
        { text: "Yes", onPress: () => console.error("Left a review") },
        {
          text: "No",
          onPress: () => console.log("No review"),
          style: "cancel",
        },
      ]
    );
  };

  return pressable ? (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => handleStarPress(starNumber)}
    >
      <FontAwesome name={iconName} size={size} color={color} />
    </TouchableOpacity>
  ) : (
    <FontAwesome name={iconName} size={size} color={color} />
  );
};

export default PressableOrNotStar;

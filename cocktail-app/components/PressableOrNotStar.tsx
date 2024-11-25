import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface PressableOrNotStarProps {
  iconName: React.ComponentProps<typeof FontAwesome>["name"];
  starNumber: number;
  onPress?: () => void;
  size?: number;
  color?: string;
}

const PressableOrNotStar: React.FC<PressableOrNotStarProps> = ({
  iconName,
  onPress,
  size = 18,
  color = Colors.light.star,
}) => {
  return onPress ? (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <FontAwesome name={iconName} size={size} color={color} />
    </TouchableOpacity>
  ) : (
    <FontAwesome name={iconName} size={size} color={color} />
  );
};

export default PressableOrNotStar;

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import PressableOrNotStar from "@/components/PressableOrNotStar";

interface ScoreStarsProps {
  score: number;
  numberOfReviews: number;
  pressable?: boolean;
}

const ScoreStars: React.FC<ScoreStarsProps> = ({
  score,
  numberOfReviews,
  pressable = false,
}) => {
  const stars = [];
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <PressableOrNotStar
          key={i}
          iconName="star"
          starNumber={i + 1}
          pressable={pressable}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <PressableOrNotStar
          key={i}
          iconName="star-half-o"
          starNumber={i + 1}
          pressable={pressable}
        />
      );
    } else {
      stars.push(
        <PressableOrNotStar
          key={i}
          iconName="star-o"
          starNumber={i + 1}
          pressable={pressable}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.stars}>{stars}</View>
      <Text style={styles.reviewNumber}>({numberOfReviews})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row" },
  stars: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingBottom: 20,
  },
  reviewNumber: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.light.grey,
    textAlign: "justify",
  },
});

export default ScoreStars;

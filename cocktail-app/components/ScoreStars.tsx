import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

interface ScoreStarsProps {
  score: number;
}

const ScoreStars: React.FC<ScoreStarsProps> = ({ score }) => {
  const stars = [];
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <FontAwesome key={i} name="star" size={18} color={Colors.light.star} />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <FontAwesome
          key={i}
          name="star-half-o"
          size={18}
          color={Colors.light.star}
        />
      );
    } else {
      stars.push(
        <FontAwesome
          key={i}
          name="star-o"
          size={18}
          color={Colors.light.star}
        />
      );
    }
  }

  return <View style={styles.stars}>{stars}</View>;
};

const styles = StyleSheet.create({
  stars: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingBottom: 20,
  },
});

export default ScoreStars;

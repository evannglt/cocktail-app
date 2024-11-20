import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

interface ScoreStarsProps {
  score: number;
  numberOfReviews: number;
}

const ScoreStars: React.FC<ScoreStarsProps> = ({ score, numberOfReviews }) => {
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

import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useEffect } from "react";

import styles from "./Card.styles";

export default function Card({ card, isRevealed, onPick }) {
  // 0 = face down, 1 = face up
  const flip = useSharedValue(0);

  useEffect(() => {
    flip.value = withTiming(isRevealed ? 1 : 0, {
      duration: 500,
    });
  }, [isRevealed]);

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flip.value, [0, 1], [0, 180]);

    return {
      transform: [{ perspective: 800 }, { rotateY: `${rotateY}deg` }],
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flip.value, [0, 1], [180, 360]);

    return {
      transform: [{ perspective: 800 }, { rotateY: `${rotateY}deg` }],
    };
  });

  return (
    <Pressable
      disabled={isRevealed}
      onPress={() => onPick(card)}
      style={styles.wrapper}
    >
      <Animated.View style={[styles.card, styles.front, frontStyle]} />

      <Animated.View
        style={[
          styles.card,
          styles.back,
          backStyle,
          { backgroundColor: card.value },
        ]}
      />
    </Pressable>
  );
}

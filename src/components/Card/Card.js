import { TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useEffect } from "react";

import styles from "./Card.styles";

export default function Card({
  card,
  isRevealed,
  isPeeked = false,
  freezeActive = false,
  onPick,
}) {
  const flip = useSharedValue(0);
  const imageScale = useSharedValue(0.85);

  const shouldShowBack = isRevealed || isPeeked || freezeActive;

  useEffect(() => {
    flip.value = withTiming(shouldShowBack ? 1 : 0, { duration: 400 });
    imageScale.value = withTiming(shouldShowBack ? 1 : 0.85, {
      duration: 300,
    });
  }, [shouldShowBack]);

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

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  return (
    <TouchableOpacity
      disabled={isRevealed || isPeeked || freezeActive}
      onPress={() => onPick(card)}
      style={styles.wrapper}
      activeOpacity={0.9}
    >
      {/* Front */}
      <Animated.View style={[styles.card, styles.front, frontStyle]}>
        <Animated.Image
          source={require("../../../assets/card/card-back.png")}
          style={[styles.animal, imageStyle]}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Back */}
      <Animated.View style={[styles.card, styles.back, backStyle]}>
        <Animated.Image
          source={card.image}
          style={[styles.animal, imageStyle]}
          resizeMode="contain"
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

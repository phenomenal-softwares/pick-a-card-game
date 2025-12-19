import { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import Card from "../Card/Card";

const GAP = 12;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_SIZE = (SCREEN_WIDTH - GAP * 3) / 2;

export default function CardGrid({ cards, isRevealed, onCardPick }) {
  return (
    <View style={styles.grid}>
      {cards.map((card, index) => (
        <AnimatedCard
          key={card.id}
          index={index}
          card={card}
          isRevealed={isRevealed}
          onCardPick={onCardPick}
        />
      ))}
    </View>
  );
}

/* ------------------------------------
   Animated Card Wrapper
-------------------------------------*/
function AnimatedCard({ index, card, isRevealed, onCardPick }) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  useEffect(() => {
    const row = Math.floor(index / 2);
    const col = index % 2;

    x.value = withTiming(col * (CARD_SIZE + GAP), {
      duration: 600,
    });

    y.value = withTiming(row * (CARD_SIZE + GAP), {
      duration: 600,
    });
  }, [index]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
    ],
  }));

  return (
    <Animated.View style={[styles.cardWrapper, style]}>
      <Card
        card={card}
        isRevealed={isRevealed}
        onPick={onCardPick}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  grid: {
    width: CARD_SIZE * 2 + GAP,
    height: CARD_SIZE * 2 + GAP,
    position: "relative",
    marginVertical: 20,
  },

  cardWrapper: {
    position: "absolute",
    width: CARD_SIZE,
    height: CARD_SIZE,
  },
});

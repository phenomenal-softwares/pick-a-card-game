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

export default function CardGrid({
  cards,
  isRevealed,
  peekedCards = [],
  freezeActive = false,
  onCardPick,
}) {
  const columns = cards.length <= 4 ? 2 : cards.length <= 6 ? 3 : 4;

  return (
    <View style={styles.grid}>
      {cards.map((card, index) => (
        <AnimatedCard
          key={card.id}
          index={index}
          columns={columns}
          card={card}
          isRevealed={isRevealed}
          peekedCards={peekedCards}
          freezeActive={freezeActive}
          onCardPick={onCardPick}
        />
      ))}
    </View>
  );
}

/* ------------------------------------
   Animated Card Wrapper
-------------------------------------*/
function AnimatedCard({ index, columns, card, isRevealed,peekedCards, freezeActive, onCardPick  }) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const CARD_SIZE = 80; // safe MVP size
  const duration = freezeActive ? 1400 : 600;

  useEffect(() => {
    const row = Math.floor(index / columns);
    const col = index % columns;

    x.value = withTiming(col * (CARD_SIZE + GAP), { duration });
    y.value = withTiming(row * (CARD_SIZE + GAP), { duration });
  }, [index, columns, freezeActive]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return (
    <Animated.View style={[styles.cardWrapper, style]}>
      <Card
        card={card}
        isRevealed={isRevealed}
        isPeeked={peekedCards.includes(card.id)}
          freezeActive={freezeActive}
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

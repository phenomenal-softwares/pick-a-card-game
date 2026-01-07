import { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import Card from "../Card/Card";

const CARD_SIZE = 126; // solid, readable
const GAP = -20;      // tight but breathable

export default function CardGrid({
  cards,
  isRevealed,
  peekedCards = [],
  freezeActive = false,
  onCardPick,
}) {
  const cardCount = cards.length;

  const columns = cardCount <= 4 ? 2 : 3;
  const rows = Math.ceil(cardCount / columns);

  const gridWidth =
    columns * CARD_SIZE + (columns - 1) * GAP;
  const gridHeight =
    rows * CARD_SIZE + (rows - 1) * GAP;

  return (
    <View
      style={[
        styles.grid,
        {
          width: gridWidth,
          height: gridHeight,
        },
      ]}
    >
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
function AnimatedCard({
  index,
  columns,
  card,
  isRevealed,
  peekedCards,
  freezeActive,
  onCardPick,
}) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const duration = freezeActive ? 1400 : 600;

  useEffect(() => {
    const row = Math.floor(index / columns);
    const col = index % columns;

    x.value = withTiming(col * (CARD_SIZE + GAP), { duration });
    y.value = withTiming(row * (CARD_SIZE + GAP), { duration });
  }, [index, columns, freezeActive]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          width: CARD_SIZE,
          height: CARD_SIZE,
        },
        style,
      ]}
    >
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
    position: "relative",
    alignSelf: "center",
    marginVertical: 16,
  },
  cardWrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});


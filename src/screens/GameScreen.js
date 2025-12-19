import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { CARD_COLORS } from "../data/cards";
import { shuffleArray } from "../utils/shuffle";
import { getHighScore, setHighScore } from "../utils/storage";

import CardGrid from "../components/CardGrid/CardGrid";

const TOTAL_ROUNDS = 10;

export default function GameScreen() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [highScore, setHighScoreState] = useState(0);

  const [cards, setCards] = useState([]);
  const [targetCard, setTargetCard] = useState(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [feedback, setFeedback] = useState("");

  /* ----------------------------
     INITIAL LOAD
  -----------------------------*/
  useEffect(() => {
    loadHighScore();
    startRound();
  }, []);

  const loadHighScore = async () => {
    const stored = await getHighScore();
    setHighScoreState(stored);
  };

  /* ----------------------------
     ROUND INITIALIZATION
  -----------------------------*/
  const startRound = () => {
    const shuffled = shuffleArray([...CARD_COLORS]);
    const target = shuffled[Math.floor(Math.random() * shuffled.length)];

    setIsRevealed(false);
    setFeedback("");

    // Delay so previous reveal settles
    setTimeout(() => {
      setCards(shuffled);
      setTargetCard(target);
    }, 300);
  };

  /* ----------------------------
     USER PICK HANDLER
  -----------------------------*/
  const handleCardPick = async (pickedCard) => {
    if (isRevealed) return;

    setIsRevealed(true);

    const isCorrect = pickedCard.id === targetCard.id;
    const newScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(newScore);
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong!");
    }

    // Delay before next round
    setTimeout(() => {
      if (round >= TOTAL_ROUNDS) {
        finalizeGame(newScore);
      } else {
        setRound((prev) => prev + 1);
        startRound();
      }
    }, 1500);
  };

  /* ----------------------------
     GAME OVER LOGIC
  -----------------------------*/
  const finalizeGame = async (finalScore) => {
    alert("GAME OVER! SCORE: " + finalScore);

    if (finalScore > highScore) {
      await setHighScore(finalScore);
      setHighScoreState(finalScore);
    }

    // Reset game
    setRound(1);
    setScore(0);
    startRound();
  };

  /* ----------------------------
     RENDER
  -----------------------------*/
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.highScore}>High Score: {highScore}</Text>
        <Text style={styles.round}>
          Round {round} / {TOTAL_ROUNDS}
        </Text>
      </View>

      {/* Target Prompt */}
      {targetCard && (
        <Text style={styles.targetText}>Pick {targetCard.label}</Text>
      )}

      {/* Card Grid */}
      <CardGrid
        cards={cards}
        isRevealed={isRevealed}
        onCardPick={handleCardPick}
      />

      {/* Feedback */}
      {feedback !== "" && <Text style={styles.feedback}>{feedback}</Text>}

      {/* Score */}
      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#b9b5d6ff",
  },

  highScore: {
    fontSize: 16,
    fontWeight: "600",
    color: "#b9b5d6ff",
  },

  round: {
    fontSize: 16,
    fontWeight: "600",
    color: "#b9b5d6ff",
  },

  targetText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#e0e0e0ff",
  },

  feedback: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    color: "#ffdd57",
  },

  score: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#a6fe23ff",
  },
});

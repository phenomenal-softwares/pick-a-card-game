import { useEffect, useState } from "react";
import { View, Text } from "react-native";

import CardGrid from "../../components/CardGrid/CardGrid";
import Feedback from "../../components/Feedback/Feedback";
import PowerupModal from "../../components/PowerupModal/PowerupModal";

import { CARD_POOLS } from "../../data/cards";
import { shuffleArray } from "../../utils/shuffle";

import styles from "./GameScreen.styles";

const TOTAL_ROUNDS = 10;

export default function GameScreen({
  difficulty,
  highScore,
  onGameOver,
  onBackToMenu,
}) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

  const [cards, setCards] = useState([]);
  const [targetCard, setTargetCard] = useState(null);

  const [isRevealed, setIsRevealed] = useState(false);

  /* ---------- FEEDBACK ---------- */
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("info");

  /* ---------- POWERUPS ---------- */
  const [showPowerupModal, setShowPowerupModal] = useState(true);
  const [powerup, setPowerup] = useState(null);
  const [powerupUses, setPowerupUses] = useState(0);
  const [peekedCards, setPeekedCards] = useState([]);

  /* ----------------------------
     INITIAL LOAD
  -----------------------------*/
  useEffect(() => {
    if (!showPowerupModal) {
      startRound();
    }
  }, [showPowerupModal]);

  /* ----------------------------
     ROUND INITIALIZATION
  -----------------------------*/
  const startRound = () => {
    const pool = CARD_POOLS[difficulty];

    if (!pool || pool.length === 0) {
      console.warn("Invalid card pool for difficulty:", difficulty);
      return;
    }

    let shuffled = shuffleArray([...pool]);
    shuffled = shuffleArray(shuffled); // double shuffle

    const target = shuffled[Math.floor(Math.random() * shuffled.length)];

    setIsRevealed(false);
    setFeedback("");
    setPeekedCards([]);

    setTimeout(() => {
      setCards(shuffled);
      setTargetCard(target);
    }, 300);
  };

  /* ----------------------------
     USER PICK HANDLER
  -----------------------------*/
  const handleCardPick = (pickedCard) => {
    if (isRevealed) return;

    setIsRevealed(true);

    const isCorrect = pickedCard.id === targetCard.id;
    const updatedScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(updatedScore);
      setFeedback("Correct!");
      setFeedbackType("success");
    } else {
      setFeedback("Wrong!");
      setFeedbackType("error");
    }

    setTimeout(() => {
      if (round >= TOTAL_ROUNDS) {
        finalizeGame(updatedScore);
      } else {
        setRound((prev) => prev + 1);
        startRound();
      }
    }, 1500);
  };

  /* ----------------------------
     POWERUP USAGE
  -----------------------------*/
  const usePowerup = () => {
    if (!powerup || powerupUses <= 0 || isRevealed) return;

    let peekCount = 0;

    if (powerup.id === "peek") peekCount = 1;
    if (powerup.id === "double_peek") peekCount = 2;

    if (peekCount > 0) {
      const candidates = cards.filter((c) => c.id !== targetCard.id);

      const shuffled = shuffleArray([...candidates]);
      const selected = shuffled.slice(0, peekCount);

      setPeekedCards(selected.map((c) => c.id));
      setPowerupUses((prev) => prev - 1);

      // hide again after delay
      setTimeout(() => {
        setPeekedCards([]);
      }, 1200);
    }

    if (powerup.id === "freeze_shuffle") {
      // placeholder — effect will be applied in startRound later
      setPowerupUses((prev) => prev - 1);
    }
  };

  /* ----------------------------
     GAME OVER
  -----------------------------*/
  const finalizeGame = (finalScore) => {
    onGameOver(finalScore);

    // reset local state
    setRound(1);
    setScore(0);
    setPowerup(null);
    setPowerupUses(0);
    setShowPowerupModal(true);
    setPeekedCards([]);
  };

  return (
    <View style={styles.container}>
      {/* POWERUP SELECTION */}
      {showPowerupModal && (
        <PowerupModal
          onComplete={(chosenPowerup, uses) => {
            setPowerup(chosenPowerup);
            setPowerupUses(uses);
            setShowPowerupModal(false);
          }}
        />
      )}

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.highScore}>High Score: {highScore}</Text>

        <View style={styles.headerRight}>
          <Text style={styles.difficultyBadge}>{difficulty}</Text>
          <Text style={styles.round}>
            Round {round} / {TOTAL_ROUNDS}
          </Text>
        </View>
      </View>

      {/* MENU */}
      <Text style={styles.menuButton} onPress={onBackToMenu}>
        ☰ Menu
      </Text>

      {/* POWERUP BUTTON */}
      {powerup && powerupUses > 0 && (
        <Text style={styles.powerupButton} onPress={usePowerup}>
          🧪 {powerup.label} ({powerupUses})
        </Text>
      )}

      {/* TARGET */}
      {targetCard && (
        <Text style={styles.targetText}>Pick {targetCard.label}</Text>
      )}

      {/* GRID */}
      <CardGrid
        cards={cards}
        isRevealed={isRevealed}
        peekedCards={peekedCards}
        onCardPick={handleCardPick}
      />

      {/* FEEDBACK */}
      <Feedback
        visible={feedback !== ""}
        message={feedback}
        type={feedbackType}
      />

      {/* SCORE */}
      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
}

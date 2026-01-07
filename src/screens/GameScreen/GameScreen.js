import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import CardGrid from "../../components/CardGrid/CardGrid";
import Feedback from "../../components/Feedback/Feedback";

import PowerupModal from "../../components/PowerupModal/PowerupModal";
import GameOverModal from "../../components/GameOverModal/GameOverModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

import { CARD_POOLS } from "../../data/cards";
import { shuffleArray } from "../../utils/shuffle";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

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

  const navigation = useNavigation();

  /* ---------- CARDS ---------- */
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
  const [freezeActive, setFreezeActive] = useState(false);

  /* --- GAME OVER MODAL --- */
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  /* --- CONFIRM MODAL --- */
  const [showExitConfirm, setShowExitConfirm] = useState(false);

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
    if (!powerup || powerupUses <= 0 || isRevealed || peekedCards.length > 0)
      return;

    // --------------------
    // STANDARD PEEKS
    // --------------------
    if (powerup.id === "peek" || powerup.id === "double_peek") {
      const peekCount = powerup.id === "peek" ? 1 : 2;

      const candidates = cards.filter(
        (c) =>
          c.id !== targetCard.id && !c.isMatched && !peekedCards.includes(c.id)
      );

      const selected = shuffleArray([...candidates]).slice(0, peekCount);

      setPeekedCards(selected.map((c) => c.id));
      setPowerupUses((prev) => prev - 1);

      setTimeout(() => setPeekedCards([]), 1200);
      return;
    }

    // --------------------
    // TRUE SIGHT (TARGET + ONE DECOY)
    // --------------------
    if (powerup.id === "true_sight") {
      const decoyCandidates = cards.filter(
        (c) => c.id !== targetCard.id && !c.isMatched
      );

      if (decoyCandidates.length === 0) return;

      const decoy = shuffleArray([...decoyCandidates])[0];

      setPeekedCards([targetCard.id, decoy.id]);
      setPowerupUses((prev) => prev - 1);

      setTimeout(() => {
        setPeekedCards([]);
      }, 1400); // slightly longer for impact

      return;
    }

    // --------------------
    // BIG SHOW
    // --------------------
    if (powerup.id === "big_show") {
      setFreezeActive(true);
      setPowerupUses((prev) => prev - 1);

      setTimeout(() => {
        setFreezeActive(false);
      }, 3000);
    }
  };

  const handlePowerupPress = () => {
    if (!powerup) {
      setFeedback("No powerup selected");
      setFeedbackType("info");
      setTimeout(() => {
        setFeedback("");
      }, 2000);
      return;
    }

    if (powerupUses <= 0) {
      setFeedback("Powerup exhausted");
      setFeedbackType("error");
      setTimeout(() => {
        setFeedback("");
      }, 2000);
      return;
    }

    usePowerup();
  };

  /* ----------------------------
     GAME OVER
  -----------------------------*/
  const finalizeGame = (finalScore) => {
    onGameOver(finalScore);
    setFinalScore(finalScore);
    setShowGameOverModal(true);
  };

  const restartGame = () => {
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
          visible={showPowerupModal}
          onComplete={({ powerup, count }) => {
            setPowerup(powerup);
            setPowerupUses(count);
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
        <TouchableOpacity
          onPress={() => setShowExitConfirm(true)}
          style={styles.menuButton}
        >
          <Ionicons size={28} color="#e5e7eb" name="menu" />
        </TouchableOpacity>
      </View>

      {/* POWERUP BUTTON */}
      <Text
        style={[
          styles.powerupButton,
          (!powerup || powerupUses <= 0) && styles.powerupButtonDisabled,
          freezeActive && styles.powerupButtonActive,
        ]}
        onPress={handlePowerupPress}
      >
        {powerup
          ? powerupUses > 0
            ? `🧪 ${powerup.label} (${powerupUses})`
            : `🧪 ${powerup.label} (empty)`
          : "🧪 No Powerup"}
      </Text>

      {/* TARGET */}
      {targetCard && (
        <Text style={styles.targetText}>Pick {targetCard.label}</Text>
      )}

      {/* GRID */}
      <CardGrid
        cards={cards}
        isRevealed={isRevealed}
        peekedCards={peekedCards}
        freezeActive={freezeActive}
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

      {/* GAME OVER MODAL */}
      <GameOverModal
        visible={showGameOverModal}
        score={finalScore}
        highScore={highScore}
        onRestart={() => {
          setShowGameOverModal(false);
          restartGame();
        }}
        onExit={() => {
          setShowGameOverModal(false);
          onBackToMenu();
        }}
      />

      {/* EXIT CONFIRMATION */}
      <ConfirmModal
        visible={showExitConfirm}
        title="Exit Game?"
        message="Your current progress will be lost. Are you sure you want to return to the menu?"
        confirmText="Exit"
        cancelText="Stay"
        onCancel={() => setShowExitConfirm(false)}
        onConfirm={() => navigation.replace("MainMenu")}
      />
    </View>
  );
}

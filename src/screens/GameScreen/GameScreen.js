import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useUser } from "../../context/userContext";

import CardGrid from "../../components/CardGrid/CardGrid";
import Feedback from "../../components/Feedback/Feedback";

import PowerupsFooter from "../../components/PowerupsFooter/PowerupsFooter";

import GameOverModal from "../../components/GameOverModal/GameOverModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

import { CARD_POOLS } from "../../data/cards";
import { shuffleArray } from "../../utils/shuffle";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "./GameScreen.styles";

const TOTAL_ROUNDS = 10;

export default function GameScreen() {
  const { user, applyGameResult, consumePowerup } = useUser();

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

  const navigation = useNavigation();

  /* ---------- CARDS ---------- */
  const [cards, setCards] = useState([]);
  const [targetCard, setTargetCard] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  /* ---------- FEEDBACK ---------- */
  const [feedback, setFeedback] = useState({
    visible: false,
    message: "",
    type: "info",
  });

  /* ---------- POWERUPS ---------- */
  const powerups = user?.powerups || {};

  const [peekedCards, setPeekedCards] = useState([]);
  const [freezeActive, setFreezeActive] = useState(false);

  /* --- GAME OVER MODAL --- */
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  /* --- CONFIRM MODAL --- */
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const difficulty = user?.difficulty || "EASY"; // ← now from context
  const highScore = user?.highScores?.[difficulty] ?? 0;

  /* ----------------------------
     INITIAL LOAD
  -----------------------------*/
  useEffect(() => {
    startRound();
  }, []);

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
    setPeekedCards([]);

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
    const updatedScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(updatedScore);
      setFeedback({ visible: true, message: "Correct!", type: "success" });
    } else {
      setFeedback({ visible: true, message: "Wrong!", type: "error" });
    }

    setTimeout(async () => {
      if (round >= TOTAL_ROUNDS) {
        // ---------- FINALIZE GAME ----------
        const correct = updatedScore;
        const wrong = TOTAL_ROUNDS - updatedScore;
        const won = correct >= TOTAL_ROUNDS / 2;

        const result = {
          score: updatedScore,
          correct,
          wrong,
          difficulty,
          won,
        };

        try {
          const { updatedUser, coinsEarned, unlockedAchievements } =
            await applyGameResult(result);

          // UI STATE ONLY
          setFinalScore(updatedScore);
          setCoinsEarned(coinsEarned);
          setUnlockedAchievements(unlockedAchievements);
          setGameWon(won);
          setShowGameOverModal(true);
        } catch (err) {
          console.error("Game result processing failed:", err);
        }
      } else {
        setRound((prev) => prev + 1);
        startRound();
      }
    }, 1500);
  };

  /* ----------------------------
     POWERUP USAGE
  -----------------------------*/
  const handleUsePowerup = async (powerupId) => {
    const available = powerups[powerupId] ?? 0;

    if (available <= 0 || isRevealed || peekedCards.length > 0) return;

    // --- PEEK / DOUBLE PEEK ---
    if (powerupId === "peek" || powerupId === "double_peek") {
      const pool = CARD_POOLS[difficulty];
      const peekCount = powerupId === "peek" ? 1 : pool.length / 2;

      const candidates = cards.filter(
        (c) =>
          c.id !== targetCard.id && !c.isMatched && !peekedCards.includes(c.id)
      );

      const selected = shuffleArray([...candidates]).slice(0, peekCount);

      setPeekedCards(selected.map((c) => c.id));
      await consumePowerup(powerupId);

      setFeedback({
        visible: true,
        message: powerupId === "peek" ? "PEEK!" : "50/50!",
        type: "info",
      });
      setTimeout(() => setPeekedCards([]), 1200);
      return;
    }

    // --- TRUE SIGHT ---
    if (powerupId === "true_sight") {
      const decoyCandidates = cards.filter(
        (c) => c.id !== targetCard.id && !c.isMatched
      );

      if (!decoyCandidates.length) return;

      const decoy = shuffleArray([...decoyCandidates])[0];

      setPeekedCards([targetCard.id, decoy.id]);
      await consumePowerup(powerupId);

      setFeedback({ visible: true, message: "TRUE SIGHT!", type: "info" });
      setTimeout(() => setPeekedCards([]), 1400);
      return;
    }

    // --- BIG SHOW ---
    if (powerupId === "big_show") {
      setFreezeActive(true);
      await consumePowerup(powerupId);

      setFeedback({ visible: true, message: "BIG SHOW!", type: "info" });
      setTimeout(() => setFreezeActive(false), 2000);
      setCards(shuffleArray([...cards])); // reshuffle for variety
      return;
    }
  };

  const restartGame = () => {
    setRound(1);
    setScore(0);
    setPeekedCards([]);
    startRound();
  };

  return (
    <View style={styles.container}>
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
          <Ionicons size={28} color="#e5e7eb" name="exit" />
        </TouchableOpacity>
      </View>

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

      <Feedback
        visible={feedback.visible}
        message={feedback.message}
        type={feedback.type}
        onHide={() => setFeedback((f) => ({ ...f, visible: false }))}
      />

      {/* SCORE */}
      <Text style={styles.score}>Score: {score}</Text>

      {/* POWERUPS FOOTER */}
      <PowerupsFooter
        inventory={powerups}
        onUse={handleUsePowerup}
        disabled={freezeActive || isRevealed}
      />

      {/* GAME OVER MODAL */}
      <GameOverModal
        visible={showGameOverModal}
        score={finalScore}
        highScore={highScore}
        coinsEarned={coinsEarned}
        won={gameWon}
        onRestart={() => {
          setShowGameOverModal(false);
          restartGame();
        }}
        onExit={() => {
          setShowGameOverModal(false);
          navigation.replace("MainMenu");
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

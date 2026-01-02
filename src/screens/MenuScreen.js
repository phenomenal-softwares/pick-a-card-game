import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { updateDifficulty } from "../utils/storage";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";

const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];

export default function MenuScreen({ userData, setUserData, onStartGame }) {
  const [showDiffConfirm, setShowDiffConfirm] = useState(false);
  const [pendingDifficulty, setPendingDifficulty] = useState(null);

  const handleDifficultyChange = (level) => {
    if (level === userData.difficulty) return;

    setPendingDifficulty(level);
    setShowDiffConfirm(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick-A-Card</Text>

      {/* Difficulty Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Difficulty</Text>

        {DIFFICULTIES.map((level) => {
          const active = level === userData.difficulty;
          return (
            <TouchableOpacity
              key={level}
              style={[styles.diffButton, active && styles.diffButtonActive]}
              onPress={() => handleDifficultyChange(level)}
            >
              <Text style={[styles.diffText, active && styles.diffTextActive]}>
                {level}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* High Score */}
      <View style={styles.section}>
        <Text style={styles.highScore}>High Score: {userData.highScore}</Text>
      </View>

      {/* Play Button */}
      <TouchableOpacity style={styles.playButton} onPress={onStartGame}>
        <Text style={styles.playText}>PLAY GAME</Text>
      </TouchableOpacity>

      {/* Confirm Difficulty Change Modal */}
      <ConfirmModal
        visible={showDiffConfirm}
        title="Change Difficulty?"
        message="Changing difficulty will reset your highest score for this mode. This action cannot be undone."
        confirmText="Change"
        cancelText="Cancel"
        onCancel={() => {
          setShowDiffConfirm(false);
          setPendingDifficulty(null);
        }}
        onConfirm={async () => {
          setShowDiffConfirm(false);

          if (!pendingDifficulty) return;

          const updatedUser = await updateDifficulty(userData, pendingDifficulty);
          setUserData(updatedUser);

          setPendingDifficulty(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0e10",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  section: {
    marginBottom: 30,
    alignItems: "center",
  },
  sectionTitle: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 10,
  },
  diffButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
    marginVertical: 6,
    width: 160,
    alignItems: "center",
  },
  diffButtonActive: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  diffText: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "600",
  },
  diffTextActive: {
    color: "#000",
  },
  highScore: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  playButton: {
    marginTop: 40,
    backgroundColor: "#2196f3",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  playText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

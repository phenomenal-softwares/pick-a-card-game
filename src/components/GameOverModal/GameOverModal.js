import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "./GameOverModal.styles";

export default function GameOverModal({
  visible,
  score,
  highScore,
  onRestart,
  onExit,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Game Over</Text>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>Score</Text>
            <Text style={styles.scoreValue}>{score}</Text>

            <Text style={styles.highScoreText}>
              High Score: {highScore}
            </Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.primary]}
              onPress={onRestart}
            >
              <Text style={styles.buttonText}>New Game</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondary]}
              onPress={onExit}
            >
              <Text style={styles.buttonText}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

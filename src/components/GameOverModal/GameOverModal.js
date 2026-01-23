import { Modal, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import styles from "./GameOverModal.styles";

export default function GameOverModal({
  visible,
  won,
  score,
  highScore,
  coinsEarned,
  onRestart,
  onExit,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* RESULT */}
          <Text
            style={[styles.resultText, won ? styles.winText : styles.loseText]}
          >
            {won ? "You Won!" : "You Lost"}
          </Text>

          {/* SCORE */}
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>

          {/* REWARD */}
          <View style={styles.rewardBox}>
            <Text style={styles.rewardLabel}>Coins Earned</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
                gap: 6,
              }}
            >
              <MaterialCommunityIcons
                name="crown-circle"
                size={24}
                color={Colors.coin}
              />
              <Text style={styles.rewardValue}>{coinsEarned}</Text>
            </View>
          </View>

          {/* HIGH SCORE */}
          <Text style={styles.highScoreText}>High Score: {highScore}</Text>

          {/* ACTIONS */}
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

import { View, Text, TouchableOpacity } from "react-native";
import { useUser } from "../../context/userContext";
import styles from "./MainMenuScreen.styles";

export default function MainMenuScreen({ navigation }) {
  const { user, loading } = useUser();

  if (loading || !user) return null; // wait until user data is loaded

  const { difficulty, coins, highScores } = user;
  const highScore = highScores[difficulty] ?? 0;

  const unlocked = user.achievements ?? [];
  const claimed = user.claimedAchievements ?? [];

  const hasUnclaimedAchievements = unlocked.some((id) => !claimed.includes(id));

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Pick A Card</Text>
        <View style={styles.userStats}>
          <Text style={styles.statText}>💰 Coins: {coins}</Text>
          <Text style={styles.statText}>🎯 Difficulty: {difficulty}</Text>
          <Text style={styles.statText}>🏆 High Score: {highScore}</Text>
        </View>
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.primaryButton, styles.button]}
          onPress={() => navigation.navigate("Game")}
        >
          <Text style={styles.buttonText}>Play Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, styles.button]}
          onPress={() => navigation.navigate("Shop")}
        >
          <Text style={styles.buttonText}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, styles.button]}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, styles.button]}
          onPress={() => navigation.navigate("Achievements")}
        >
          <View style={styles.achievementButtonContent}>
            <Text style={styles.buttonText}>Achievements</Text>

            {hasUnclaimedAchievements && <View style={styles.redDot} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, styles.button]}
          onPress={() => navigation.navigate("Stats")}
        >
          <Text style={styles.buttonText}>Stats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

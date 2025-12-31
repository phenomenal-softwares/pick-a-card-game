import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import MenuScreen from "./src/screens/MenuScreen";
import GameScreen from "./src/screens/GameScreen/GameScreen";

import {
  loadUserData,
  updateHighScore,
} from "./src/utils/storage";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [screen, setScreen] = useState("MENU"); // MENU | GAME
  const [loading, setLoading] = useState(true);

  // Load user data once on app start
  useEffect(() => {
    const init = async () => {
      const data = await loadUserData();
      setUserData(data);
      setLoading(false);
    };

    init();
  }, []);

  // Called when game ends and score is finalized
  const handleGameOver = async (finalScore) => {
    alert("Game Over! Your score: " + finalScore);
    const updatedUser = await updateHighScore(userData, finalScore);
    setUserData(updatedUser);
  };

  if (loading || !userData) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <>
      {screen === "MENU" && (
        <MenuScreen
          userData={userData}
          setUserData={setUserData}
          onStartGame={() => setScreen("GAME")}
        />
      )}

      {screen === "GAME" && (
        <GameScreen
          difficulty={userData.difficulty}
          highScore={userData.highScore}
          onGameOver={handleGameOver}
          onBackToMenu={() => setScreen("MENU")}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: "#0e0e10",
    alignItems: "center",
    justifyContent: "center",
  },
});

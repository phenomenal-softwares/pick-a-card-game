import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainMenuScreen from "./src/screens/MainMenuScreen/MainMenuScreen";
import SettingsScreen from "./src/screens/SettingsScreen/SettingsScreen";
import GameScreen from "./src/screens/GameScreen/GameScreen";

import { loadUserData, updateHighScore } from "./src/utils/storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const data = await loadUserData();
      setUserData(data);
      setLoading(false);
    };
    init();
  }, []);

  const handleGameOver = async (finalScore) => {
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
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="MainMenu">
          {(props) => (
            <MainMenuScreen
              {...props}
              userData={userData}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Game">
          {(props) => (
            <GameScreen
              {...props}
              difficulty={userData.difficulty}
              highScore={userData.highScore}
              onGameOver={handleGameOver}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Settings">
          {(props) => (
            <SettingsScreen
              {...props}
              userData={userData}
              setUserData={setUserData}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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

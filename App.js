import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainMenuScreen from "./src/screens/MainMenuScreen/MainMenuScreen";
import SettingsScreen from "./src/screens/SettingsScreen/SettingsScreen";
import GameScreen from "./src/screens/GameScreen/GameScreen";
import AchievementsScreen from "./src/screens/AchievementsScreen/AchievementsScreen";
import StatsScreen from "./src/screens/StatsScreen/StatsScreen";
import ShopScreen from "./src/screens/ShopScreen/ShopScreen";

import { UserProvider, useUser } from "./src/context/userContext";

const Stack = createNativeStackNavigator();

// Loader wrapper to wait for user data
function AppLoader({ children }) {
  const { user, loading } = useUser();

  if (loading || !user) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return children;
}

export default function App() {
  return (
    <UserProvider>
      <AppLoader>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: "fade",
            }}
          >
            <Stack.Screen name="MainMenu" component={MainMenuScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Achievements" component={AchievementsScreen} />
            <Stack.Screen name="Stats" component={StatsScreen} />
            <Stack.Screen name="Shop" component={ShopScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppLoader>
    </UserProvider>
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

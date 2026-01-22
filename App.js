import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainMenuScreen from "./src/screens/MainMenuScreen/MainMenuScreen";
import SettingsScreen from "./src/screens/SettingsScreen/SettingsScreen";
import GameScreen from "./src/screens/GameScreen/GameScreen";
import AchievementsScreen from "./src/screens/AchievementsScreen/AchievementsScreen";
import StatsScreen from "./src/screens/StatsScreen/StatsScreen";
import ShopScreen from "./src/screens/ShopScreen/ShopScreen";
import LoadingScreen from "./src/screens/LoadingScreen/LoadingScreen";
import ExtrasScreen from "./src/screens/ExtrasScreen/ExtrasScreen";

import { UserProvider, useUser } from "./src/context/userContext";
import { SoundProvider } from "./src/context/soundContext";

const Stack = createNativeStackNavigator();

/* ---------------------------------
   APP LOADER (SINGLE RESPONSIBILITY)
---------------------------------- */
function AppLoader({ children }) {
  const { loading } = useUser();
  const [assetsReady, setAssetsReady] = useState(false);

  if (loading || !assetsReady) {
    return (
      <LoadingScreen onFinish={() => setAssetsReady(true)} />
    );
  }

  return children;
}


export default function App() {
  return (
    <UserProvider>
      <SoundProvider>
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
              <Stack.Screen
                name="Achievements"
                component={AchievementsScreen}
              />
              <Stack.Screen name="Stats" component={StatsScreen} />
              <Stack.Screen name="Shop" component={ShopScreen} />
              <Stack.Screen name="Extras" component={ExtrasScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppLoader>
      </SoundProvider>
    </UserProvider>
  );
}

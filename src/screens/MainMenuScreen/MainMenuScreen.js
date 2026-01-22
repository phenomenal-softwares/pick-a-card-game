import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";

import { useUser } from "../../context/userContext";
import { useSound } from "../../context/soundContext";
import { playSound } from "../../utils/soundManager";
import Colors from "../../constants/colors";
import styles from "./MainMenuScreen.styles";

export default function MainMenuScreen({ navigation }) {
  const { user, loading } = useUser();
  const { soundsEnabled } = useSound();

  if (loading || !user) return null;

  const { difficulty, coins, highScores } = user;
  const highScore = highScores?.[difficulty] ?? 0;

  const unlocked = user.achievements ?? [];
  const claimed = user.claimedAchievements ?? [];
  const hasUnclaimedAchievements = unlocked.some(
    (id) => !claimed.includes(id)
  );

  const go = (screen) => {
    if (soundsEnabled) playSound("button");
    navigation.navigate(screen);
  };

  return (
    <LinearGradient
      colors={[Colors.strawberry, Colors.strawberryGreen]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* HEADER */}
      <Animated.View entering={FadeInUp.duration(600)} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.extrasButton} onPress={() => go("Extras")}>
            <Ionicons
              name="apps"
              size={28}
              color={Colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.extrasButton} onPress={() => go("Settings")}>
            <Ionicons
              name="settings"
              size={28}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.statsRow}>
          <View style={styles.statPill}>
            <FontAwesome5 name="coins" size={16} color={Colors.coin} />
            <Text style={styles.statText}>{coins}</Text>
          </View>

          <View style={styles.statPill}>
            <Ionicons name="flash" size={16} color={Colors.strawberryGreen} />
            <Text style={styles.statText}>{difficulty}</Text>
          </View>

          <View style={styles.statPill}>
            <Ionicons name="trophy" size={16} color={Colors.scoreBg} />
            <Text style={styles.statText}>{highScore}</Text>
          </View>
        </View>
      </Animated.View>

      {/* MENU GRID */}
      <View style={styles.grid}>
        <MenuTile
          label="Play"
          icon="play"
          primary
          onPress={() => go("Game")}
        />

        <MenuTile
          label="Shop"
          icon="cart"
          onPress={() => go("Shop")}
        />

        <MenuTile
          label="Achievements"
          icon="ribbon"
          badge={hasUnclaimedAchievements}
          onPress={() => go("Achievements")}
        />

        <MenuTile
          label="Stats"
          icon="stats-chart"
          onPress={() => go("Stats")}
        />
      </View>
    </LinearGradient>
  );
}

/* -----------------------------
   MENU TILE COMPONENT
------------------------------ */
function MenuTile({ label, icon, onPress, primary, badge }) {
  return (
    <Animated.View entering={FadeInUp.duration(500)}>
      <TouchableOpacity
        style={[
          styles.tile,
          primary && styles.tilePrimary,
        ]}
        onPress={onPress}
        activeOpacity={0.55}
      >
        <Ionicons
          name={icon}
          size={36}
          color={primary ? Colors.white : Colors.textPrimary}
        />

        <Text
          style={[
            styles.tileText,
            primary && styles.tileTextPrimary,
          ]}
        >
          {label}
        </Text>

        {badge && <View style={styles.badgeDot} />}
      </TouchableOpacity>
    </Animated.View>
  );
}

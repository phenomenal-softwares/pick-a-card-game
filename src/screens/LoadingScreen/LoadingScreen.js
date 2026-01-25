import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
} from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import styles from "./LoadingScreen.styles";
import { unlockAndPlayMusic, playSound } from "../../utils/soundManager";

const MIN_LOADING_TIME = 3000;
const MAX_ALLOWED_WIDTH = 768;

export default function LoadingScreen({ onFinish }) {
  const { width } = useWindowDimensions();

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const isBlocked = width > MAX_ALLOWED_WIDTH;

  useEffect(() => {
    if (isBlocked) return;

    let startTime = Date.now();

    (async () => {
      const assets = [
        require("../../../assets/card/card-back.png"),
        require("../../../assets/animals/cat.png"),
        require("../../../assets/animals/cow.png"),
        require("../../../assets/animals/dog.png"),
        require("../../../assets/animals/elephant.png"),
        require("../../../assets/animals/fox.png"),
        require("../../../assets/animals/lion.png"),
        require("../../../assets/animals/monkey.png"),
        require("../../../assets/animals/panda.png"),
        require("../../../assets/animals/tiger.png"),
      ];

      let loaded = 0;
      const total = assets.length + 1;

      await Font.loadAsync({
        GameFont: require("../../../assets/fonts/GloriaHallelujah-Regular.ttf"),
        FeedbackFont: require("../../../assets/fonts/Winter-Tosca.ttf"),
      });

      loaded++;
      setProgress(loaded / total);

      for (const asset of assets) {
        await Asset.fromModule(asset).downloadAsync();
        loaded++;
        setProgress(loaded / total);
      }

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        setProgress(1);
        setReady(true);
      }, remaining);
    })();
  }, [isBlocked]);

  const handleLaunch = async () => {
    playSound("button");
    await unlockAndPlayMusic();
    onFinish?.();
  };

  /* ------------------------------
     BLOCKED VIEW (DESKTOP)
  ------------------------------- */
  if (isBlocked) {
    return (
      <View style={styles.blockedContainer}>
        <Text style={styles.blockedTitle}>Mobile Only Game</Text>

        <Text style={styles.blockedText}>
          Pick-A-Card is designed exclusively for mobile devices.
        </Text>

        <Text style={styles.blockedHint}>
          Resize your browser window or open on your phone to play.
        </Text>
      </View>
    );
  }

  /* ------------------------------
     NORMAL LOADING
  ------------------------------- */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick-A-Card</Text>
      <Text style={styles.subtitle}>Shuffling the deck…</Text>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${progress * 100}%` },
          ]}
        />
      </View>

      {ready && (
        <Pressable
          style={styles.launchButton}
          onPress={handleLaunch}
        >
          <Text style={styles.launchText}>Launch Game</Text>
        </Pressable>
      )}
    </View>
  );
}

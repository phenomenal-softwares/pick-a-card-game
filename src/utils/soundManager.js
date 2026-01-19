import { Audio } from "expo-av";
import { Platform } from "react-native";

let bgMusic = null;
const sounds = {};
let audioUnlocked = false;

export const loadAllSounds = async () => {
  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
  });

  sounds.button = new Audio.Sound();
  sounds.powerup = new Audio.Sound();
  sounds.correct = new Audio.Sound();
  sounds.gameWin = new Audio.Sound();
  sounds.gameOver = new Audio.Sound();

  bgMusic = new Audio.Sound();

  await Promise.all([
    bgMusic.loadAsync(require("../../assets/sounds/bg-music.mp3"), {
      isLooping: true,
      volume: 0.5,
    }),
    sounds.button.loadAsync(require("../../assets/sounds/button-press.mp3")),
    sounds.powerup.loadAsync(require("../../assets/sounds/power-up.mp3")),
    sounds.correct.loadAsync(require("../../assets/sounds/correct.mp3")),
    sounds.gameWin.loadAsync(require("../../assets/sounds/game-win.mp3")),
    sounds.gameOver.loadAsync(require("../../assets/sounds/game-over.mp3")),
  ]);
};

export const unlockAndPlayMusic = async () => {
  if (!bgMusic || audioUnlocked) {
    const status = await bgMusic.getStatusAsync();
    if (!status.isPlaying) {
      await bgMusic.playAsync();
    }
    return;
  }

  audioUnlocked = true;
  const status = await bgMusic.getStatusAsync();
  if (!status.isPlaying) {
    await bgMusic.playAsync();
  }
};

export const playMusic = async () => {
  if (!bgMusic || Platform.OS === "web") return;
  const status = await bgMusic.getStatusAsync();
  if (!status.isPlaying) {
    await bgMusic.playAsync();
  }
};

export const stopMusic = async () => {
  if (!bgMusic) return;
  await bgMusic.stopAsync();
};

export const playSound = async (key) => {
  const sound = sounds[key];
  if (!sound) return;

  try {
    await sound.replayAsync();
  } catch {}
};

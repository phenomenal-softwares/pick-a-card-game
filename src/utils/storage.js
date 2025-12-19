import AsyncStorage from "@react-native-async-storage/async-storage";

export const getHighScore = async () => {
  const score = await AsyncStorage.getItem("HIGH_SCORE");
  return score ? Number(score) : 0;
};

export const setHighScore = async (score) => {
  await AsyncStorage.setItem("HIGH_SCORE", score.toString());
};

export const resetHighScore = async () => {
  await AsyncStorage.setItem("HIGH_SCORE", "0");
};

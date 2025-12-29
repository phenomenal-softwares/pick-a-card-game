import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "PICK_A_CARD_USER";

const DEFAULT_USER_DATA = {
  difficulty: "EASY",
  highScore: 0,
  stats: {
    gamesPlayed: 0,
    totalCorrect: 0,
    totalWrong: 0,
  },
  achievements: [],
};

/**
 * Load user data from storage
 */
export const loadUserData = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }

    // First launch
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(DEFAULT_USER_DATA)
    );
    return DEFAULT_USER_DATA;
  } catch (err) {
    console.warn("Failed to load user data:", err);
    return DEFAULT_USER_DATA;
  }
};

/**
 * Save full user object
 */
export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(userData)
    );
  } catch (err) {
    console.warn("Failed to save user data:", err);
  }
};

/**
 * Update difficulty and reset high score
 */
export const updateDifficulty = async (userData, newDifficulty) => {
  const updatedUser = {
    ...userData,
    difficulty: newDifficulty,
    highScore: 0, // reset by rule
  };

  await saveUserData(updatedUser);
  return updatedUser;
};

/**
 * Update high score if higher
 */
export const updateHighScore = async (userData, newScore) => {
  if (newScore <= userData.highScore) return userData;

  const updatedUser = {
    ...userData,
    highScore: newScore,
  };

  await saveUserData(updatedUser);
  return updatedUser;
};

/**
 * Hard reset (optional utility)
 */
export const resetUserData = async () => {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(DEFAULT_USER_DATA)
  );
  return DEFAULT_USER_DATA;
};

import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "PICK_A_CARD_USER";

const DEFAULT_USER_DATA = {
  difficulty: "EASY",

  highScores: {
    EASY: 0,
    MEDIUM: 0,
    HARD: 0,
  },

  coins: 0,

  stats: {
    gamesPlayed: 0,
    gamesWon: 0,
    totalCorrect: 0,
    totalWrong: 0,
  },

  achievements: [],
  claimedAchievements: [], // claimed achievement IDs
};

/* ----------------------------------
   LOAD USER DATA (WITH MIGRATION)
----------------------------------- */
export const loadUserData = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed = JSON.parse(stored);

      // 🔄 Migration: old single highScore → per-difficulty
      if (!parsed.highScores) {
        parsed.highScores = {
          EASY: parsed.highScore || 0,
          MEDIUM: 0,
          HARD: 0,
        };
        delete parsed.highScore;
      }

      // Ensure coins
      if (parsed.coins == null) parsed.coins = 0;

      // Ensure stats integrity
      parsed.stats = {
        gamesPlayed: parsed.stats?.gamesPlayed ?? 0,
        gamesWon: parsed.stats?.gamesWon ?? 0,
        totalCorrect: parsed.stats?.totalCorrect ?? 0,
        totalWrong: parsed.stats?.totalWrong ?? 0,
      };

      // Ensure achievements
      if (!Array.isArray(parsed.achievements)) {
        parsed.achievements = [];
      }

      await saveUserData(parsed);
      return parsed;
    }

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

/* ----------------------------------
   SAVE USER DATA
----------------------------------- */
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

/* ----------------------------------
   PROCESS GAME RESULT (CORE ENGINE)
----------------------------------- */
export const processGameResult = async (userData, result) => {
  const { score, correct, wrong, difficulty, won, lost } = result;

  const updatedUser = {
    ...userData,
    stats: { ...userData.stats },
    highScores: { ...userData.highScores },
    achievements: [...userData.achievements],
  };

  const unlocked = [];

  // --------------------
  // STATS
  // --------------------
  updatedUser.stats.gamesPlayed += 1;
  updatedUser.stats.totalCorrect += correct;
  updatedUser.stats.totalWrong += wrong;

  if (won) updatedUser.stats.gamesWon += 1;
  else updatedUser.stats.gamesLost += 1;

  if (wrong === 0 && won) {
    updatedUser.stats.flawlessWins += 1;
  }

  // --------------------
  // HIGH SCORE (PER DIFFICULTY)
  // --------------------
  if (score > updatedUser.highScores[difficulty]) {
    updatedUser.highScores[difficulty] = score;
  }

  // --------------------
  // COINS
  // --------------------
  let coinsEarned = correct * 2;
  if (won) coinsEarned += 10;

  updatedUser.coins += coinsEarned;

  // --------------------
  // ACHIEVEMENTS
  // --------------------

  const has = (id) => updatedUser.achievements.includes(id);

  if (updatedUser.stats.gamesPlayed === 1 && !has("first_game")) {
    unlocked.push("first_game");
  }

  if (won && !has("first_win")) {
    unlocked.push("first_win");
  }

  if (won && wrong === 0 && !has("flawless")) {
    unlocked.push("flawless");
  }

  if (score >= 8 && !has("sharp_eye")) {
    unlocked.push("sharp_eye");
  }

  if (updatedUser.stats.gamesPlayed >= 25 && !has("veteran")) {
    unlocked.push("veteran");
  }

  if (updatedUser.stats.gamesPlayed >= 100 && !has("grinder")) {
    unlocked.push("grinder");
  }

  if (won && difficulty === "HARD" && !has("hard_win")) {
    unlocked.push("hard_win");
  }

  if (updatedUser.stats.flawlessWins >= 5 && !has("perfect_streak")) {
    unlocked.push("perfect_streak");
  }

  updatedUser.achievements.push(...unlocked);

  await saveUserData(updatedUser);

  return {
    updatedUser,
    coinsEarned,
    unlockedAchievements: unlocked,
  };
};

/* ----------------------------------
   UPDATE DIFFICULTY
----------------------------------- */
export const updateDifficulty = async (userData, newDifficulty) => {
  const updatedUser = {
    ...userData,
    difficulty: newDifficulty,
    highScores: {
      ...userData.highScores,
      [newDifficulty]: 0, // reset only this difficulty
    },
  };

  await saveUserData(updatedUser);
  return updatedUser;
};

/* ----------------------------------
   HARD RESET
----------------------------------- */
export const resetUserData = async () => {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(DEFAULT_USER_DATA)
  );
  return DEFAULT_USER_DATA;
};

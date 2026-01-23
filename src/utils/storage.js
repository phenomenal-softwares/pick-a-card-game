import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "PICK_A_CARD_USER";

/* ----------------------------------
   DEFAULT USER DATA
----------------------------------- */
const DEFAULT_USER_DATA = {
  difficulty: "EASY",

  highScores: {
    EASY: 0,
    MEDIUM: 0,
    HARD: 0,
  },

  coins: 1000,

  powerups: {
    peek: 5,
    double_peek: 5,
    big_show: 5,
    true_sight: 5,
  },

  stats: {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    flawlessWins: 0,
    totalCorrect: 0,
    totalWrong: 0,
  },

  achievements: [],
  claimedAchievements: [],
};

/* ----------------------------------
   LOAD USER DATA (WITH MIGRATION)
----------------------------------- */
export const loadUserData = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed = JSON.parse(stored);

      // ---- High score migration
      if (!parsed.highScores) {
        parsed.highScores = {
          EASY: parsed.highScore || 0,
          MEDIUM: 0,
          HARD: 0,
        };
        delete parsed.highScore;
      }

      // ---- Coins
      if (parsed.coins == null) parsed.coins = 0;

      // ---- Powerups (merge defaults)
      parsed.powerups = {
        ...DEFAULT_USER_DATA.powerups,
        ...(parsed.powerups || {}),
      };

      // ---- Stats (full integrity)
      parsed.stats = {
        ...DEFAULT_USER_DATA.stats,
        ...(parsed.stats || {}),
      };

      // ---- Achievements
      if (!Array.isArray(parsed.achievements)) parsed.achievements = [];
      if (!Array.isArray(parsed.claimedAchievements))
        parsed.claimedAchievements = [];

      await saveUserData(parsed);
      return parsed;
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER_DATA));
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
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (err) {
    console.warn("Failed to save user data:", err);
  }
};

/* ----------------------------------
   PROCESS GAME RESULT (CORE ENGINE)
----------------------------------- */
export const processGameResult = async (userData, result) => {
  const { score, correct, wrong, difficulty, won } = result;

  const updatedUser = {
    ...userData,
    stats: { ...userData.stats },
    highScores: { ...userData.highScores },
    achievements: [...userData.achievements],
  };

  const unlocked = [];

  // ---- Stats
  updatedUser.stats.gamesPlayed += 1;
  updatedUser.stats.totalCorrect += correct;
  updatedUser.stats.totalWrong += wrong;

  if (won) {
    updatedUser.stats.gamesWon += 1;
  } else {
    updatedUser.stats.gamesLost += 1;
  }

  if (won && wrong === 0) {
    updatedUser.stats.flawlessWins += 1;
  }

  // ---- High score
  if (score > updatedUser.highScores[difficulty]) {
    updatedUser.highScores[difficulty] = score;
  }

  // ---- Coins
  let coinsEarned = correct * 20;
  if (won) coinsEarned += 50;
  updatedUser.coins += coinsEarned;

  // ---- Achievements
  const has = (id) => updatedUser.achievements.includes(id);

  if (updatedUser.stats.gamesPlayed === 1 && !has("first_game"))
    unlocked.push("first_game");

  if (won && !has("first_win")) unlocked.push("first_win");

  if (won && wrong === 0 && !has("flawless")) unlocked.push("flawless");

  if (score >= 8 && !has("sharp_eye")) unlocked.push("sharp_eye");

  if (updatedUser.stats.gamesPlayed >= 5 && !has("rising"))
    unlocked.push("rising");

  if (updatedUser.stats.gamesPlayed >= 25 && !has("veteran"))
    unlocked.push("veteran");

  if (updatedUser.stats.gamesPlayed >= 100 && !has("grinder"))
    unlocked.push("grinder");

  if (won && difficulty === "HARD" && !has("hard_win"))
    unlocked.push("hard_win");

  if (updatedUser.stats.flawlessWins >= 5 && !has("perfect_streak"))
    unlocked.push("perfect_streak");

  updatedUser.achievements.push(...unlocked);

  await saveUserData(updatedUser);

  return {
    updatedUser,
    coinsEarned,
    unlockedAchievements: unlocked,
  };
};

/* ----------------------------------
   ADD POWERUPS (SHOP / REWARDS)
----------------------------------- */
export const addPowerups = async (userData, additions) => {
  const updatedUser = {
    ...userData,
    powerups: { ...userData.powerups },
  };

  Object.entries(additions).forEach(([id, count]) => {
    updatedUser.powerups[id] = (updatedUser.powerups[id] || 0) + count;
  });

  await saveUserData(updatedUser);
  return updatedUser;
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
      [newDifficulty]: 0,
    },
  };

  await saveUserData(updatedUser);
  return updatedUser;
};

/* ----------------------------------
   HARD RESET
----------------------------------- */
export const resetUserData = async () => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER_DATA));
  return DEFAULT_USER_DATA;
};

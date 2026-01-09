import { createContext, useContext, useEffect, useState } from "react";
import {
  loadUserData,
  processGameResult,
  updateDifficulty,
  saveUserData,
  resetUserData,
} from "../utils/storage";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load once on app start
  useEffect(() => {
    (async () => {
      const data = await loadUserData();
      setUser(data);
      setLoading(false);
    })();
  }, []);

  // ---- ACTIONS ----

  const applyGameResult = async (result) => {
    const response = await processGameResult(user, result);
    setUser(response.updatedUser);
    return response;
  };

  // inside UserProvider
  const claimAchievement = async (achievement) => {
    if (!user) return;

    const claimed = user.claimedAchievements ?? [];
    if (claimed.includes(achievement.id)) return; // already claimed

    const updatedUser = {
      ...user,
      coins: user.coins + (achievement.reward.coins || 0),
      claimedAchievements: [...claimed, achievement.id],
      powerups: [
        ...(user.powerups || []),
        ...(achievement.reward.powerups || []),
      ],
    };

    // Save to storage
    await saveUserData(updatedUser);

    // Update context state
    setUser(updatedUser);
  };

  const changeDifficulty = async (difficulty) => {
    const updated = await updateDifficulty(user, difficulty);
    setUser(updated);
  };

  const hardReset = async () => {
    const fresh = await resetUserData();
    setUser(fresh);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        applyGameResult,
        claimAchievement,
        changeDifficulty,
        hardReset,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook (clean, traditional, reusable)
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
};

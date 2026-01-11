import { createContext, useContext, useEffect, useState } from "react";
import {
  loadUserData,
  processGameResult,
  updateDifficulty,
  addPowerups,
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

  const claimAchievement = async (achievement) => {
    if (!user) return;

    const claimed = user.claimedAchievements ?? [];
    if (claimed.includes(achievement.id)) return;

    // clone existing powerups
    const updatedPowerups = { ...(user.powerups || {}) };

    // add powerups rewards
    if (achievement.reward.powerups?.length) {
      achievement.reward.powerups.forEach((id) => {
        updatedPowerups[id] = (updatedPowerups[id] || 0) + 1;
      });
    }

    const updatedUser = {
      ...user,
      coins: user.coins + (achievement.reward.coins || 0),
      powerups: updatedPowerups,
      claimedAchievements: [...claimed, achievement.id],
    };

    await saveUserData(updatedUser);
    setUser(updatedUser);
  };

  const usePowerup = async (powerupId) => {
    const count = user.powerups?.[powerupId] ?? 0;
    if (count <= 0) return;

    const updatedUser = {
      ...user,
      powerups: {
        ...user.powerups,
        [powerupId]: count - 1,
      },
    };

    await saveUserData(updatedUser);
    setUser(updatedUser);
  };

  const grantPowerups = async (powerups) => {
    const updated = await addPowerups(user, powerups);
    setUser(updated);
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
        usePowerup,
        grantPowerups,
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

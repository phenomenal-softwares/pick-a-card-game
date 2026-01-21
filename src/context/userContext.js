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

  const claimAchievement = async (achievement) => {
    if (!user) return;

    const claimed = user.claimedAchievements ?? [];
    if (claimed.includes(achievement.id)) return;

    const updatedPowerups = { ...(user.powerups || {}) };

    const updatedUser = {
      ...user,
      coins: user.coins + (achievement.reward.coins || 0),
      powerups: updatedPowerups,
      claimedAchievements: [...claimed, achievement.id],
    };

    if (achievement.reward.powerups?.length) {
      achievement.reward.powerups.forEach(({ id, qty }) => {
        updatedUser.powerups[id] = (updatedUser.powerups[id] || 0) + qty;
      });
    }

    await saveUserData(updatedUser);
    setUser(updatedUser);
  };

  const consumePowerup = async (powerupId) => {
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

  // shop purchase
  const addPowerups = async (powerupsToAdd, cost = 0) => {
    if (!user) return;

    if (cost > user.coins) {
      // not enough coins
      return { success: false, message: "Not enough coins" };
    }

    const updatedUser = {
      ...user,
      coins: user.coins - cost,
      powerups: { ...user.powerups },
    };

    Object.entries(powerupsToAdd).forEach(([id, count]) => {
      updatedUser.powerups[id] = (updatedUser.powerups[id] || 0) + count;
    });

    await saveUserData(updatedUser);
    setUser(updatedUser);

    return { success: true, message: "Purchase successful" };
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
        consumePowerup,
        grantPowerups,
        addPowerups,
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

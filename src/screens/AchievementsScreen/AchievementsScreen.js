import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppHeader from "../../components/AppHeader/AppHeader";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

import { ACHIEVEMENTS } from "../../data/achievements";
import { useUser } from "../../context/userContext";

import styles from "./AchievementsScreen.styles";

export default function AchievementsScreen() {
  const { user, claimAchievement, grantPowerups } = useUser();
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  if (!user) return null;

  const claimed = user.claimedAchievements ?? [];

  const handleClaim = async (achievement) => {
    await claimAchievement(achievement); // ✅ use context
    setSelected(null);
  };

  const renderItem = ({ item }) => {
    const isUnlocked = user.achievements.includes(item.id);
    const isClaimed = claimed.includes(item.id);

    return (
      <View
        style={[
          styles.card,
          isUnlocked && styles.cardUnlocked,
          isClaimed && styles.cardClaimed,
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>

        {!isUnlocked && <Text style={styles.locked}>🔒 Locked</Text>}

        {isUnlocked && !isClaimed && (
          <TouchableOpacity
            style={styles.claimBtn}
            onPress={() => setSelected(item)}
          >
            <Text style={styles.claimText}>
              Claim +{item.reward.coins} coins
              {item.reward.powerups?.length
                ? ` + ${item.reward.powerups.join(", ")} powerup(s)`
                : ""}
            </Text>
          </TouchableOpacity>
        )}

        {isClaimed && <Text style={styles.claimed}>✅ Claimed</Text>}
      </View>
    );
  };

  return (
    <>
      <AppHeader title="Achievements" onBack={() => navigation.goBack()} />

      <FlatList
        contentContainerStyle={styles.list}
        data={ACHIEVEMENTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <ConfirmModal
        visible={!!selected}
        title="Claim Reward?"
        message={`Claim ${selected?.reward.coins} coins${
          selected?.reward.powerups?.length
            ? ` and ${selected.reward.powerups.join(", ")} powerup(s)`
            : ""
        } for "${selected?.title}"?`}
        confirmText="Claim"
        cancelText="Cancel"
        onCancel={() => setSelected(null)}
        onConfirm={() => handleClaim(selected)}
      />
    </>
  );
}

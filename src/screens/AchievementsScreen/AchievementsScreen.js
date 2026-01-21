import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

import AppHeader from "../../components/AppHeader/AppHeader";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

import { ACHIEVEMENTS } from "../../data/achievements";
import { POWERUP_MAP } from "../../data/powerups";
import { useUser } from "../../context/userContext";
import Colors from "../../constants/colors";

import styles from "./AchievementsScreen.styles";

export default function AchievementsScreen() {
  const navigation = useNavigation();
  const { user, claimAchievement } = useUser();
  const [selected, setSelected] = useState(null);

  if (!user) return null;

  const unlocked = user.achievements ?? [];
  const claimed = user.claimedAchievements ?? [];

  const renderItem = ({ item, index }) => {
    const isUnlocked = unlocked.includes(item.id);
    const isClaimed = claimed.includes(item.id);

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 40 }}
        style={[
          styles.card,
          isUnlocked && styles.cardUnlocked,
          isClaimed && styles.cardClaimed,
        ]}
      >
        {/* LEFT: REWARDS */}
        <View style={styles.rewardColumn}>
          <View style={styles.coinRow}>
            <MaterialCommunityIcons
              name="crown-circle"
              size={26}
              color={Colors.coin}
            />

            <Text style={styles.coinAmount}>{item.reward.coins}</Text>
          </View>

          {/* POWERUPS */}
          {item.reward.powerups?.length > 0 && (
            <View style={styles.powerupRow}>
              {item.reward.powerups.map((p) => {
                const powerup = POWERUP_MAP[p.id];
                if (!powerup) return null;

                return (
                  <View key={p.id} style={styles.powerupItem}>
                    <Ionicons
                      name={powerup.icon.name}
                      size={26}
                      color={Colors.surface}
                    />
                    <Text style={styles.powerupQty}>{p.qty}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* RIGHT: CONTENT */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Ionicons
              name={isUnlocked ? "ribbon" : "lock-closed"}
              size={18}
              color={isUnlocked ? Colors.success : Colors.textMuted}
            />
            <View style={styles.titleWrapper}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          {/* ACTION */}
          <View style={styles.actionRow}>
            {isClaimed && (
              <View style={styles.claimedPill}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={Colors.white}
                />
                <Text style={styles.claimedText}>Claimed</Text>
              </View>
            )}

            {!isClaimed && (
              <TouchableOpacity
                disabled={!isUnlocked}
                style={[
                  styles.actionButton,
                  !isUnlocked && styles.actionButtonLocked,
                ]}
                onPress={() => setSelected(item)}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={isUnlocked ? "gift" : "lock-closed"}
                  size={16}
                  color={Colors.white}
                />
                <Text style={styles.actionText}>
                  {isUnlocked ? "Claim" : "Locked"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </MotiView>
    );
  };

  return (
    <>
      <AppHeader title="Achievements" onBack={() => navigation.goBack()} />

      <FlatList
        data={ACHIEVEMENTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <ConfirmModal
        visible={!!selected}
        title="Claim Reward"
        message="Do you want to claim this achievement reward?"
        confirmText="Claim"
        cancelText="Cancel"
        onCancel={() => setSelected(null)}
        onConfirm={() => {
          claimAchievement(selected);
          setSelected(null);
        }}
      />
    </>
  );
}

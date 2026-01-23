import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useNavigation } from "@react-navigation/native";

import { useUser } from "../../context/userContext";
import { useSound } from "../../context/soundContext";
import {
  unlockAndPlayMusic,
  stopMusic,
  playSound,
} from "../../utils/soundManager";
import styles from "./SettingsScreen.styles";

const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];

export default function SettingsScreen() {
  const { user, changeDifficulty, hardReset } = useUser();
  const navigation = useNavigation();

  const [showDiffConfirm, setShowDiffConfirm] = useState(false);
  const [pendingDifficulty, setPendingDifficulty] = useState(null);

  const { soundsEnabled, setSoundsEnabled } = useSound();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) return null; // Wait until context loads

  /* ---------- HANDLE DIFFICULTY ---------- */
  const handleDifficultyChange = (level) => {
    if (level === user.difficulty) return;
    setPendingDifficulty(level);
    setShowDiffConfirm(true);
  };

  const confirmDifficultyChange = async () => {
    setShowDiffConfirm(false);
    if (!pendingDifficulty) return;

    await changeDifficulty(pendingDifficulty);
    setPendingDifficulty(null);
  };

  /* ---------- HANDLE DELETE DATA ---------- */
  const confirmDeleteData = async () => {
    navigation.goBack();
    setShowDeleteConfirm(false);
    await hardReset();
  };

  return (
    <>
      <AppHeader title="Settings" onBack={() => navigation.goBack()} />

      <View style={styles.container}>
        {/* DIFFICULTY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Difficulty</Text>
          <View style={styles.row}>
            {DIFFICULTIES.map((level) => {
              const active = level === user.difficulty;
              return (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.optionButton,
                    active && styles.optionButtonActive,
                  ]}
                  onPress={() => handleDifficultyChange(level)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      active && styles.optionTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* GAME SOUNDS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Sounds</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                soundsEnabled && styles.optionButtonActive,
              ]}
              onPress={async () => {
                playSound("button");

                // explicitly unlock and play music inside the user gesture
                if (!soundsEnabled) {
                  await unlockAndPlayMusic();
                }

                setSoundsEnabled(true);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  soundsEnabled && styles.optionTextActive,
                ]}
              >
                ON
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                !soundsEnabled && styles.optionButtonActive,
              ]}
              onPress={() => setSoundsEnabled(false)}
            >
              <Text
                style={[
                  styles.optionText,
                  !soundsEnabled && styles.optionTextActive,
                ]}
              >
                OFF
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* DELETE DATA */}
        <View style={styles.dangerZone}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowDeleteConfirm(true)}
          >
            <Text style={styles.deleteText}>Delete Game Data</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONFIRM DIFFICULTY CHANGE */}
      <ConfirmModal
        visible={showDiffConfirm}
        title="Change Difficulty?"
        message="Changing difficulty will reset your highest score for this mode. This action cannot be undone."
        confirmText="Change"
        cancelText="Cancel"
        onCancel={() => {
          setShowDiffConfirm(false);
          setPendingDifficulty(null);
        }}
        onConfirm={confirmDifficultyChange}
      />

      {/* CONFIRM DELETE */}
      <ConfirmModal
        visible={showDeleteConfirm}
        title="Delete All Game Data?"
        message="This will permanently erase your progress, high scores, and settings. This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        destructive
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeleteData}
      />
    </>
  );
}

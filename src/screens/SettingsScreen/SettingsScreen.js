import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { updateDifficulty } from "../../utils/storage";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useNavigation } from "@react-navigation/native";

import styles from "./SettingsScreen.styles";

const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];

export default function SettingsScreen({ userData, setUserData }) {
  const navigation = useNavigation();

  const [showDiffConfirm, setShowDiffConfirm] = useState(false);
  const [pendingDifficulty, setPendingDifficulty] = useState(null);

  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDifficultyChange = (level) => {
    if (level === userData.difficulty) return;
    setPendingDifficulty(level);
    setShowDiffConfirm(true);
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
              const active = level === userData.difficulty;

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

        {/* SOUNDS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Sounds</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                soundsEnabled && styles.optionButtonActive,
              ]}
              onPress={() => setSoundsEnabled(true)}
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

      {/* CONFIRM DIFFICULTY */}
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
        onConfirm={async () => {
          setShowDiffConfirm(false);

          if (!pendingDifficulty) return;

          const updatedUser = await updateDifficulty(
            userData,
            pendingDifficulty
          );
          setUserData(updatedUser);
          setPendingDifficulty(null);
        }}
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
        onConfirm={() => {
          // Hook real delete logic later
          setShowDeleteConfirm(false);
        }}
      />
    </>
  );
}

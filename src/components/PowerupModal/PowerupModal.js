import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./PowerupModal.styles";

const POWERUPS = [
  { id: "peek", label: "Peek" },
  { id: "double_peek", label: "Double Peek" },
  { id: "freeze_shuffle", label: "Freeze Shuffle" },
];

const COUNTERS = [1, 2, 5];

export default function PowerupModal({ visible, onComplete }) {
  const [selectedPowerup, setSelectedPowerup] = useState(null);
  const [selectedCount, setSelectedCount] = useState(null);
  const [stage, setStage] = useState("powerup"); // powerup | counter

  useEffect(() => {
    if (selectedPowerup && selectedCount) {
      // Give user a short moment to see result
      const timer = setTimeout(() => {
        onComplete({
          powerup: selectedPowerup,
          count: selectedCount,
        });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [selectedPowerup, selectedCount]);

  const handlePowerupPick = (item) => {
    if (selectedPowerup) return;
    setSelectedPowerup(item);
    setStage("counter");
  };

  const handleCounterPick = (count) => {
    if (selectedCount) return;
    setSelectedCount(count);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Text style={styles.title}>
            Pick a Powerup
          </Text>

          {/* Powerup Cards */}
          <View style={styles.cardRow}>
            {POWERUPS.map((item) => {
              const opened = selectedPowerup?.id === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.card,
                    opened && styles.cardOpen,
                  ]}
                  onPress={() => handlePowerupPick(item)}
                  disabled={!!selectedPowerup}
                >
                  <Text style={styles.cardText}>
                    {opened ? item.label : "?"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Counter Section */}
          <Text style={styles.subtitle}>
            Powerup Uses
          </Text>

          <View style={styles.cardRow}>
            {COUNTERS.map((count) => {
              const opened = selectedCount === count;

              return (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.card,
                    opened && styles.cardOpen,
                    stage === "powerup" && styles.cardDisabled,
                  ]}
                  onPress={() => handleCounterPick(count)}
                  disabled={stage === "powerup" || !!selectedCount}
                >
                  <Text style={styles.cardText}>
                    {opened ? `${count}x` : "?"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

        </View>
      </View>
    </Modal>
  );
}

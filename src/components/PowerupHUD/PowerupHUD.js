import { View, Text, TouchableOpacity } from "react-native";
import styles from "./PowerupHUD.styles";

export default function PowerupHUD({
  powerup,
  onActivate,
}) {
  if (!powerup) return null;

  const isDisabled = powerup.uses <= 0;

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.label}>
          Powerup
        </Text>

        <Text style={styles.name}>
          {formatPowerupName(powerup.type)}
        </Text>
      </View>

      <TouchableOpacity
        disabled={isDisabled}
        onPress={onActivate}
        style={[
          styles.button,
          isDisabled && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>
          Use ({powerup.uses})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------------------------
   Helpers
----------------------------------*/
function formatPowerupName(type) {
  switch (type) {
    case "peek":
      return "Peek";
    case "double_peek":
      return "Double Peek";
    case "freeze_shuffle":
      return "Freeze Shuffle";
    default:
      return "Unknown";
  }
}

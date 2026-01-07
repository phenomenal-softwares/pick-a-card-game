import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./AppHeader.styles";

export default function AppHeader({
  title,
  onBack,
  rightSlot = null,
}) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#e5e7eb" />
        </TouchableOpacity>
      ) : (
        <View style={styles.backPlaceholder} />
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.right}>
        {rightSlot}
      </View>
    </View>
  );
}

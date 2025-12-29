import { View, Text } from "react-native";
import styles from "./Feedback.styles";

export default function Feedback({
  message,
  type = "info",
  visible = false,
}) {
  if (!visible || !message) return null;

  return (
    <View style={[styles.container, styles[type]]}>
      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

import { useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./Feedback.styles";

export default function Feedback({
  message,
  type = "info",
  visible = false,
  duration = 1400, // ms
  onHide,
}) {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onHide?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onHide]);

  if (!visible || !message) return null;

  return (
    <View style={[styles.container, styles[type]]}>
      <Text style={[styles.text, styles[type]]}>{message}</Text>
    </View>
  );
}

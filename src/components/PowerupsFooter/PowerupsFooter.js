import { View, TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { POWERUPS } from "../../data/powerups";
import { renderPowerupIcon } from "../../utils/renderPowerupIcon";
import styles from "./PowerupsFooter.styles";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function PowerupsFooter({ inventory, onUse, disabled }) {
  return (
    <View style={styles.container}>
      {POWERUPS.map((p) => {
        const count = inventory?.[p.id] ?? 0;
        const isDisabled = disabled || count <= 0;

        const scale = useSharedValue(1);

        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: scale.value }],
        }));

        const handlePress = () => {
          if (isDisabled) return;

          // old-school tactile feedback
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

          scale.value = withSequence(
            withSpring(0.9),
            withSpring(1)
          );

          onUse(p.id);
        };

        return (
          <AnimatedTouchable
            key={p.id}
            style={[
              styles.powerup,
              { backgroundColor: p.color },
              isDisabled && styles.disabled,
              animatedStyle,
            ]}
            onPress={handlePress}
            disabled={isDisabled}
            activeOpacity={0.85}
          >
            {renderPowerupIcon(p.icon, 45, "#E0653B")}
            <Text style={styles.count}>{count}</Text>
          </AnimatedTouchable>
        );
      })}
    </View>
  );
}

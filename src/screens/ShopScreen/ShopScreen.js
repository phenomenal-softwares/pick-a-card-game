import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { MotiView, AnimatePresence } from "moti";
import { useUser } from "../../context/userContext";
import { POWERUPS } from "../../data/powerups";
import { renderPowerupIcon } from "../../utils/renderPowerupIcon";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../../components/AppHeader/AppHeader";
import Feedback from "../../components/Feedback/Feedback";
import styles from "./ShopScreen.styles";

export default function ShopScreen() {
  const { user, addPowerups } = useUser();
  const navigation = useNavigation();

  const [feedback, setFeedback] = useState({
    visible: false,
    message: "",
    type: "info",
  });

  if (!user) return null;

  const handlePurchase = async (powerup) => {
    const cost = powerup.price || 10;
    const res = await addPowerups({ [powerup.id]: 1 }, cost);

    setFeedback({
      visible: true,
      message: res.success ? `Bought 1 ${powerup.label}!` : res.message,
      type: res.success ? "success" : "error",
    });
  };

  const renderItem = ({ item, index }) => {
    const ownedCount = user.powerups[item.id] || 0;

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 80, type: "timing" }}
        style={styles.card}
      >
        {/* ICON */}
        <View style={styles.iconWrapper}>
          {renderPowerupIcon(item.icon, 26, "#fff")}
        </View>

        {/* INFO */}
        <View style={styles.info}>
          <Text style={styles.name}>{item.label}</Text>
          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.count}>Owned: {ownedCount}</Text>
            <Text
              style={[
                styles.price,
                user.coins < (item.price ?? 10) && styles.priceInsufficient,
              ]}
            >
              {item.price ?? 10} coins
            </Text>
          </View>
        </View>

        {/* BUY BUTTON */}
        <TouchableOpacity
          style={styles.buyButton}
          activeOpacity={0.85}
          onPress={() => handlePurchase(item)}
        >
          <MotiView
            from={{ scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ type: "timing", duration: 120 }}
          >
            <Text style={styles.buyText}>Buy</Text>
          </MotiView>
        </TouchableOpacity>
      </MotiView>
    );
  };

  return (
    <>
      <AppHeader title="Shop" onBack={() => navigation.goBack()} />

      <View style={styles.container}>
        {/* COINS */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
        >
          <Text style={styles.coins}>🪙 {user.coins} coins</Text>
        </MotiView>

        {/* LIST */}
        <FlatList
          data={POWERUPS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* FEEDBACK */}
        <AnimatePresence>
          {feedback.visible && (
            <Feedback
              visible={feedback.visible}
              message={feedback.message}
              type={feedback.type}
              onHide={() =>
                setFeedback((prev) => ({ ...prev, visible: false }))
              }
            />
          )}
        </AnimatePresence>
      </View>
    </>
  );
}

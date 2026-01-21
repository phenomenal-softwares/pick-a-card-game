import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: Colors.strawberryDark,
  },

  card: {
    flexDirection: "row",
    backgroundColor: Colors.glowStrawberry,
    borderRadius: 18,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },

  cardUnlocked: {
    borderColor: Colors.surface,
  },

  cardClaimed: {
    opacity: 0.7,
  },

  /* LEFT COLUMN */
  rewardColumn: {
    width: 90,
    backgroundColor: Colors.strawberryDark,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },

  coinRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  coinAmount: {
    color: Colors.coin,
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 4,
  },

  powerupRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },

  powerupItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  powerupQty: {
    fontSize: 16,
    color: Colors.surface,
    fontWeight: "bold",
    marginHorizontal: 4,
  },

  /* RIGHT CONTENT */
  content: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textOnColor,
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 13,
    color: Colors.strawberrySoft,
    lineHeight: 18,
  },

  actionRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  actionButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.strawberryGreenDark,
  },

  actionButtonLocked: {
    backgroundColor: Colors.textMuted,
  },

  actionText: {
    color: Colors.textOnColor,
    fontSize: 13,
    fontWeight: "600",
  },

  claimedPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.surfaceAlt,
  },

  claimedText: {
    color: Colors.textOnColor,
    fontSize: 13,
    fontWeight: "600",
  },
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: "#0e0e10",
  },

  card: {
    backgroundColor: "#1a1a1d",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },

  cardUnlocked: {
    borderColor: "#4caf50",
  },

  cardClaimed: {
    opacity: 0.6,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  desc: {
    color: "#aaa",
    marginBottom: 10,
  },

  locked: {
    color: "#777",
  },

  claimBtn: {
    backgroundColor: "#4caf50",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },

  claimText: {
    color: "#000",
    fontWeight: "700",
  },

  claimed: {
    color: "#4caf50",
    fontWeight: "600",
  },
});

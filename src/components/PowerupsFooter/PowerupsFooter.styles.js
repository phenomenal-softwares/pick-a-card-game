import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#020617",
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
  },

  powerup: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  disabled: {
    opacity: 0.35,
  },

  count: {
    position: "absolute",
    bottom: 6,
    right: 8,
    fontSize: 12,
    fontWeight: "800",
    color: "#fff",
  },
});

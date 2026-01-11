import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    top: 90,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 999,
    elevation: 6,
  },

  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  info: {
    backgroundColor: "#3b82f6",
  },

  success: {
    backgroundColor: "#22c55e",
  },

  error: {
    backgroundColor: "#ef4444",
  },

  warning: {
    backgroundColor: "#f59e0b",
  },
});

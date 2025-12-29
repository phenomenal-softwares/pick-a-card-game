import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 8,
    alignSelf: "center",
    minWidth: "70%",
  },

  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  /* ---- MOODS ---- */

  success: {
    backgroundColor: "#22c55e",
  },

  error: {
    backgroundColor: "#ef4444",
  },

  info: {
    backgroundColor: "#3b82f6",
  },

  warning: {
    backgroundColor: "#facc15",
  },
});

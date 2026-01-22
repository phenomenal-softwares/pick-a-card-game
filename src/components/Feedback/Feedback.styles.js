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
    fontFamily: "FeedbackFont",
    textAlign: "center",
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
    fontSize: 32,
    fontWeight: "600",
  },

  info: {
    color: "#1a53ae",
  },

  success: {
    color: "#169a47",
  },

  error: {
    color: "#8f0909",
  },

  warning: {
    color: "#f59e0b",
  },
});

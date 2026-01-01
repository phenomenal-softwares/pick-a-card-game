import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "85%",
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#f9fafb",
    marginBottom: 12,
  },

  scoreBox: {
    alignItems: "center",
    marginVertical: 12,
  },

  scoreText: {
    fontSize: 16,
    color: "#9ca3af",
  },

  scoreValue: {
    fontSize: 40,
    fontWeight: "900",
    color: "#22c55e",
    marginVertical: 4,
  },

  highScoreText: {
    fontSize: 14,
    color: "#60a5fa",
  },

  actions: {
    marginTop: 20,
    width: "100%",
    gap: 12,
  },

  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  primary: {
    backgroundColor: "#22c55e",
  },

  secondary: {
    backgroundColor: "#374151",
  },

  buttonText: {
    color: "#f9fafb",
    fontSize: 16,
    fontWeight: "700",
  },
});

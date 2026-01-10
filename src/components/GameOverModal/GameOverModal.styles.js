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
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
  },

  /* RESULT */
  resultText: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 12,
  },

  winText: {
    color: "#22c55e",
  },

  loseText: {
    color: "#ef4444",
  },

  /* SCORE */
  scoreBox: {
    alignItems: "center",
    marginVertical: 8,
  },

  scoreLabel: {
    fontSize: 15,
    color: "#9ca3af",
  },

  scoreValue: {
    fontSize: 42,
    fontWeight: "900",
    color: "#f9fafb",
    marginTop: 4,
  },

  /* REWARD */
  rewardBox: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#1f2933",
    borderRadius: 12,
    alignItems: "center",
  },

  rewardLabel: {
    fontSize: 14,
    color: "#9ca3af",
  },

  rewardValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#facc15",
    marginTop: 2,
  },

  /* HIGH SCORE */
  highScoreText: {
    fontSize: 14,
    color: "#60a5fa",
    marginTop: 10,
  },

  /* ACTIONS */
  actions: {
    marginTop: 22,
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

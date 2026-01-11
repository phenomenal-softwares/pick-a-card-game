import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0e0e10",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerRight: {
    alignItems: "flex-end",
    gap: 4,
  },

  highScore: {
    fontSize: 16,
    fontWeight: "600",
    color: "#b9b5d6ff",
  },

  round: {
    fontSize: 14,
    fontWeight: "600",
    color: "#b9b5d6ff",
  },

  difficultyBadge: {
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#334155",
    color: "#e5e7eb",
  },

  menuButton: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "600",
    color: "#60a5fa",
    marginTop: 6,
  },

  powerupButton: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "700",
    color: "#fef3c7",
    backgroundColor: "#7c3aed",
    opacity: 1,
  },

  powerupButtonActive: {
    backgroundColor: "#2563eb",
  },

  powerupButtonDisabled: {
    backgroundColor: "#374151",
    color: "#9ca3af",
    opacity: 0.6,
  },

  powerupContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  powerupCount: {
    fontSize: 14,
    fontWeight: "800",
    color: "#f9fafb",
  },

  powerupEmpty: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6b7280",
  },

  targetText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#e0e0e0ff",
  },

  score: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#a6fe23ff",
  },
});

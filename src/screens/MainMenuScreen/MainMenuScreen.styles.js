import { startTransition, use } from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0e10",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  userStats: {
    marginTop: 20,
  },
  statText: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 4,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  achievementButtonContent: {
    position: "relative",
    alignItems: "center",
  },

  redDot: {
    position: "absolute",
    top: -4,
    right: -10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ef4444",
  },
  disabledButton: {
    backgroundColor: "#555",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  highScore: {
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
  },
});

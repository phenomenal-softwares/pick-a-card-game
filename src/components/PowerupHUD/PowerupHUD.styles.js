import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#0f172a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  info: {
    flexDirection: "column",
  },

  label: {
    fontSize: 12,
    color: "#94a3b8",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e5e7eb",
  },

  button: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#22c55e",
  },

  buttonDisabled: {
    backgroundColor: "#334155",
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#022c22",
  },
});

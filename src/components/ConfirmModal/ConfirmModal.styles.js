import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "80%",
    backgroundColor: "#111827",
    borderRadius: 14,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f9fafb",
    marginBottom: 8,
  },

  message: {
    fontSize: 15,
    color: "#d1d5db",
    marginBottom: 20,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },

  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  cancel: {
    backgroundColor: "#374151",
  },

  confirm: {
    backgroundColor: "#ef4444",
  },

  buttonText: {
    color: "#f9fafb",
    fontWeight: "600",
  },
});

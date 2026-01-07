import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0e10",
    padding: 20,
  },

  section: {
    marginVertical: 30,
  },

  sectionTitle: {
    color: "#9ca3af",
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },

  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#374151",
    backgroundColor: "#111827",
  },

  optionButtonActive: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },

  optionText: {
    color: "#d1d5db",
    fontSize: 15,
    fontWeight: "600",
  },

  optionTextActive: {
    color: "#022c22",
  },

  dangerZone: {
    marginTop: "auto",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
  },

  deleteButton: {
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#7f1d1d",
    alignItems: "center",
  },

  deleteText: {
    color: "#fee2e2",
    fontSize: 16,
    fontWeight: "700",
  },
});

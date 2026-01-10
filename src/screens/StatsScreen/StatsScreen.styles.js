import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#0e0e10",
  },

  section: {
    marginBottom: 28,
    backgroundColor: "#16161a",
    borderRadius: 12,
    padding: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
  },

  label: {
    fontSize: 14,
    color: "#9ca3af",
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#f9fafb",
  },
});

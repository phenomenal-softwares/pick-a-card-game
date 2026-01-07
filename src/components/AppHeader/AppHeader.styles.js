import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: "#0e0e10",
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },

  backButton: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  backPlaceholder: {
    width: 40,
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#e5e7eb",
  },

  right: {
    width: 40,
    alignItems: "flex-end",
  },
});

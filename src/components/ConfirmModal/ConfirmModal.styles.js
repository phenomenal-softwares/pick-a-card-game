import { StyleSheet } from "react-native";
import Colors, { colors } from "../../constants/colors";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "80%",
    backgroundColor: Colors.surfaceAlt,
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
    backgroundColor: Colors.surface,
  },

  confirm: {
    backgroundColor: Colors.danger,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});

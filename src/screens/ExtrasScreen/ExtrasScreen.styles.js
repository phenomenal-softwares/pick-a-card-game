import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 40,
    backgroundColor: Colors.strawberryDark,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.glowStrawberry,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.strawberryGreenDark,
  },

  rowPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.85,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  label: {
    fontSize: 15,
    color: Colors.textOnColor,
    fontWeight: "500",
  },

  footer: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 12,
    color: Colors.strawberrySoft,
  },
});

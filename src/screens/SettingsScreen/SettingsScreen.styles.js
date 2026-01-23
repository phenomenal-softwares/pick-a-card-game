import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.strawberryDark,
    padding: 20,
  },

  section: {
    marginVertical: 30,
  },

  sectionTitle: {
    fontFamily: "GameFont",
    color: Colors.strawberrySoft,
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
    borderColor: Colors.strawberryGreenDark,
    backgroundColor: Colors.strawberry,
  },

  optionButtonActive: {
    backgroundColor: Colors.strawberryGreenDark,
    borderColor: Colors.strawberryGreen,
  },

  optionText: {
    fontFamily: "GameFont",
    color: Colors.textOnColor,
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
    fontFamily: "GameFont",
    color: "#fee2e2",
    fontSize: 16,
    fontWeight: "700",
  },
});

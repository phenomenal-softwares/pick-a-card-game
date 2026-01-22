import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: Colors.strawberryDark,
  },

  section: {
    marginBottom: 28,
    backgroundColor: Colors.strawberry,
    borderRadius: 12,
    padding: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.strawberrySoft,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.strawberryGreenDark,
  },

  label: {
    fontSize: 14,
    color: Colors.strawberrySoft,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#f9fafb",
  },
});

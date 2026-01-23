import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: Colors.strawberryDark,
    borderBottomWidth: 1,
    borderBottomColor: Colors.headerAccent,
  },

  backButton: {
    padding: 8,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    // elevation / depth
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },

  backPlaceholder: {
    width: 40,
  },

  title: {
    flex: 1,
    fontFamily: "GameFont",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#e5e7eb",
  },

  right: {
    width: 40,
    alignItems: "flex-end",
  },
});

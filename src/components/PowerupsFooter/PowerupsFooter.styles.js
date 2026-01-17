import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.strawberryDark,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 10,
  },

  powerup: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  disabled: {
    opacity: 0.35,
  },

  count: {
    position: "absolute",
    bottom: 6,
    right: 8,
    fontSize: 12,
    fontWeight: "800",
    color: "#fff",
  },
});

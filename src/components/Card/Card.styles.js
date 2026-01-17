import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  wrapper: {
    width: "45%",
    aspectRatio: 1,
    marginVertical: 10,
  },

  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backfaceVisibility: "hidden",
  },

  front: {
    backgroundColor: Colors.strawberryDark,
  },

  back: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.cardBack,
  },

  animal: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});

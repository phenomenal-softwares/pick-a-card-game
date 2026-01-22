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
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
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

  pressed: {
  transform: [{ scale: 0.66 }],
  opacity: 0.85,
},
});

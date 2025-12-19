import { StyleSheet } from "react-native";

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
    backgroundColor: "#2c3e50",
  },

  back: {
    alignItems: "center",
    justifyContent: "center",
  },
});

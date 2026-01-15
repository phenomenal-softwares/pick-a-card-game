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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827", // or transparent if you prefer
  },

  animal: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});

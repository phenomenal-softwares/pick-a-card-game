import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "90%",
    backgroundColor: "#0e1a2b",
    borderRadius: 16,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 14,
  },

  subtitle: {
    fontSize: 16,
    color: "#bbb",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 10,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: 90,
    height: 110,
    backgroundColor: "#1c2d4a",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  cardOpen: {
    backgroundColor: "#2d8cff",
  },

  cardDisabled: {
    opacity: 0.4,
  },

  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

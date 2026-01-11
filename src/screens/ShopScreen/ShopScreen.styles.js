import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#111827",
  },

  coins: {
    fontSize: 20,
    fontWeight: "800",
    color: "#facc15",
    textAlign: "center",
    marginBottom: 18,
  },

  listContent: {
    paddingBottom: 120,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },

  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    color: "#f9fafb",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 2,
  },

  description: {
    color: "#d1d5db",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  count: {
    color: "#9ca3af",
    fontSize: 13,
  },

  price: {
    color: "#60a5fa",
    fontSize: 14,
    fontWeight: "700",
  },

  priceInsufficient: {
    color: "#ef4444", // red-500
  },

  buyButton: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    marginLeft: 12,
  },

  buyText: {
    color: "#f9fafb",
    fontWeight: "800",
    fontSize: 14,
  },
});

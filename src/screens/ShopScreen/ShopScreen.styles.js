import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.strawberryDark,
  },

  coinsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  coins: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.coin,
    textAlign: "center",
  },

  listContent: {
    paddingBottom: 120,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.glowStrawberry,
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
    backgroundColor: Colors.strawberry,
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
    color: Colors.strawberrySoft,
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
    color: Colors.textPrimary,
    fontSize: 13,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  price: {
    color: Colors.coin,
    fontSize: 14,
    fontWeight: "700",
  },

  priceInsufficient: {
    color: Colors.dangerSoft,
  },

  buyButton: {
    backgroundColor: Colors.strawberryGreen,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    marginLeft: 12,
  },

  buyText: {
    color: Colors.textSecondary,
    fontWeight: "800",
    fontSize: 14,
  },
});

import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const { width } = Dimensions.get("window");
const TILE_SIZE = (width - 48) / 2; // 2-column grid with padding

export default StyleSheet.create({
  /* -----------------------------
     ROOT
  ------------------------------ */
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.appBackground,
  },

  /* -----------------------------
     HEADER
  ------------------------------ */
  header: {
    alignItems: "center",
    marginBottom: 32,
  },

  headerTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },

  extrasButton: {
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

  logo: {
    width: 240,
    height: 240,
    marginBottom: 16,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
  },

  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },

  statText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.white,
  },

  /* -----------------------------
     GRID
  ------------------------------ */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
    marginTop: 12,
  },

  /* -----------------------------
     TILE
  ------------------------------ */
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
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

  tilePrimary: {
    backgroundColor: Colors.strawberry,
    borderColor: "rgba(255,255,255,0.25)",
  },

  tileText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },

  tileTextPrimary: {
    color: Colors.white,
    fontWeight: "700",
  },

  /* -----------------------------
     BADGE
  ------------------------------ */
  badgeDot: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.danger,
  },
});

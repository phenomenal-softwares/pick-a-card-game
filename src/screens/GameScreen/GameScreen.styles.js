import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },

  /* ======================
     HEADER SHELL
  ====================== */
  header: {
    width: "100%",
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    elevation: 12,
    shadowColor: Colors.glowStrawberry,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* ======================
     SCORE CARD
  ====================== */
  scoreCard: {
    minWidth: 64,
    height: 46,
    borderRadius: 16,
    backgroundColor: Colors.scoreBg,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.glowStrawberry,
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  scoreValue: {
    fontFamily: "GameFont",
    fontSize: 22,
    fontWeight: "900",
    color: Colors.textOnColor,
  },

  /* ======================
     DIFFICULTY BADGE
  ====================== */
  difficultyBadge: {
    backgroundColor: Colors.surfaceSoft,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },

  difficultyText: {
    color: Colors.strawberryDark,
    fontFamily: "GameFont",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  /* ======================
     EXIT BUTTON
  ====================== */
  exitButton: {
    backgroundColor: Colors.danger,
    padding: 10,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.danger,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  /* ======================
     HEADER BOTTOM
  ====================== */
  headerBottom: {
    marginTop: 12,
    alignItems: "center",
  },

  /* ======================
     PROGRESS BAR
  ====================== */
  progressTrack: {
    width: "100%",
    height: 8,
    backgroundColor: Colors.progressBg,
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: Colors.progressFill,
    borderRadius: 999,
  },

  roundText: {
    marginTop: 6,
    color: Colors.textOnColor,
    fontFamily: "GameFont",
    fontSize: 14,
    fontWeight: "600",
  },

  targetContainer: {
    alignItems: "center",
    marginVertical: 16,
  },

  targetLabel: {
    color: Colors.textPrimary,
    fontFamily: "GameFont",
    fontSize: 14,
    marginBottom: 6,
    letterSpacing: 0.5,
  },

  targetCard: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: Colors.strawberry,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  targetImage: {
    width: "90%",
    height: "90%",
    borderRadius: 12,
  },

  targetName: {
    fontFamily: "GameFont",
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
    opacity: 0.8,
  },
});

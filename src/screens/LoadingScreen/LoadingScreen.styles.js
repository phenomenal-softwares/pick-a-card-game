import { StyleSheet, Platform } from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  /* -------------------------------
     ROOT CONTAINER
  -------------------------------- */
  container: {
    flex: 1,
    backgroundColor: Colors.strawberryDark,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  /* -------------------------------
     TITLE
  -------------------------------- */
  title: {
    fontFamily: "GameFont",
    fontSize: 42,
    color: Colors.strawberryGreen,
    letterSpacing: 1.2,
    marginBottom: 6,
    textShadowColor: "rgba(0,0,0,0.15)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textOnColor,
    marginBottom: 26,
    letterSpacing: 0.4,
  },

  /* -------------------------------
     PROGRESS BAR
  -------------------------------- */
  track: {
    width: "100%",
    height: 14,
    backgroundColor: Colors.progressBg,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 28,
    borderWidth: 2,
    borderColor: Colors.cardBorder,
  },

  fill: {
    height: "100%",
    backgroundColor: Colors.progressFill,
    borderRadius: 999,
  },

  /* -------------------------------
     LAUNCH BUTTON
  -------------------------------- */
  launchButton: {
    marginTop: 10,
    backgroundColor: Colors.surface,
    paddingHorizontal: 42,
    paddingVertical: 14,
    borderRadius: 999,
    elevation: Platform.OS === "android" ? 8 : 0,
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    transform: [{ scale: 1 }],
  },

  launchText: {
    fontSize: 16,
    fontWeight: "900",
    color: Colors.strawberryDark,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  // BLOCKED FOR DESKTOPS SCREENS
  blockedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.strawberryDark,
    gap: 8,
  },

  blockedTitle: {
    fontSize: 24,
    color: Colors.textOnColor,
    fontWeight: "bold"
  },

  blockedText: {
    fontSize: 16,
    color: Colors.textOnColor,
  },

  blockedHint: {
    fontSize: 14,
    color: Colors.strawberryLight,
  }
});

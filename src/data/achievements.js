export const ACHIEVEMENTS = [
  // --- ONBOARDING ---
  {
    id: "first_game",
    title: "First Steps",
    description: "Play your first game",
    reward: { coins: 20, powerups: [] },
  },
  {
    id: "first_win",
    title: "Winner!",
    description: "Win your first game",
    reward: { coins: 30, powerups: ["peek"] },
  },

  // --- PERFORMANCE ---
  {
    id: "flawless",
    title: "Flawless Victory",
    description: "Win without a single mistake",
    reward: { coins: 50, powerups: ["true_sight"] },
  },
  {
    id: "sharp_eye",
    title: "Sharp Eye",
    description: "Score 8 or more correct picks in a game",
    reward: { coins: 40, powerups: ["double_peek"] },
  },

  // --- PROGRESSION ---
  {
    id: "rising",
    title: "Rising Player",
    description: "Play 5 games",
    reward: { coins: 70, powerups: ["peek"] },
  },
  {
    id: "veteran",
    title: "Veteran",
    description: "Play 25 games",
    reward: { coins: 100, powerups: ["true_sight"] },
  },
  {
    id: "grinder",
    title: "Grinder",
    description: "Play 100 games",
    reward: { coins: 250, powerups: ["double_peek"] },
  },

  // --- DIFFICULTY ---
  {
    id: "hard_win",
    title: "Against the Odds",
    description: "Win a game on HARD difficulty",
    reward: { coins: 80, powerups: ["true_sight"] },
  },

  // --- MASTERY ---
  {
    id: "perfect_streak",
    title: "Perfectionist",
    description: "Achieve 5 flawless victories",
    reward: { coins: 150, powerups: ["true_sight", "peek"] },
  },
];

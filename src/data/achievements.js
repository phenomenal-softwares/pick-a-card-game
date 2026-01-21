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
    reward: { coins: 30, powerups: [{ id: "peek", qty: 2 }] },
  },

  // --- PERFORMANCE ---
  {
    id: "flawless",
    title: "Flawless Victory",
    description: "Win without a single mistake",
    reward: { coins: 50, powerups: [{ id: "true_sight", qty: 10 }] },
  },
  {
    id: "sharp_eye",
    title: "Sharp Eye",
    description: "Score 8 or more correct picks in a game",
    reward: { coins: 40, powerups: [{ id: "double_peek", qty: 5 }] },
  },

  // --- PROGRESSION ---
  {
    id: "rising",
    title: "Rising Player",
    description: "Play 5 games",
    reward: { coins: 70, powerups: [{ id: "peek", qty: 10 }] },
  },
  {
    id: "veteran",
    title: "Veteran",
    description: "Play 25 games",
    reward: { coins: 100, powerups: [{ id: "true_sight", qty: 8 }] },
  },
  {
    id: "grinder",
    title: "Grinder",
    description: "Play 100 games",
    reward: { coins: 250, powerups: [{ id: "double_peek", qty: 10 }] },
  },

  // --- DIFFICULTY ---
  {
    id: "hard_win",
    title: "Against the Odds",
    description: "Win a game on HARD difficulty",
    reward: { coins: 80, powerups: [{ id: "true_sight", qty: 6 }] },
  },

  // --- MASTERY ---
  {
    id: "perfect_streak",
    title: "Perfectionist",
    description: "Achieve 5 flawless victories",
    reward: { coins: 150, powerups: [{ id: "true_sight", qty: 8 }, { id: "peek", qty: 15 }] },
  },
];

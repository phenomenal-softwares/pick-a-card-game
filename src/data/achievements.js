export const ACHIEVEMENTS = [
  {
    id: "first_game",
    title: "First Steps",
    description: "Play your first game",
    reward: {
      coins: 20,
      powerups: [],
    },
  },
  {
    id: "first_win",
    title: "Winner!",
    description: "Win a game",
    reward: {
      coins: 30,
      powerups: ["peek"],
    },
  },
  {
    id: "flawless",
    title: "Flawless Victory",
    description: "Win without a single mistake",
    reward: {
      coins: 50,
      powerups: ["true_sight"],
    },
  },
];

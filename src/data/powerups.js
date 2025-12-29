export const POWERUPS = [
  {
    id: "peek",
    label: "Peek",
    description: "Reveal one random card briefly.",
    maxTargets: 1,
    rarity: "common",
  },
  {
    id: "double_peek",
    label: "Double Peek",
    description: "Reveal two random cards briefly.",
    maxTargets: 2,
    rarity: "rare",
  },
  {
    id: "shuffle_freeze",
    label: "Shuffle Freeze",
    description: "Slow down the shuffle animation.",
    maxTargets: 0, // no card reveal
    rarity: "epic",
  },
];

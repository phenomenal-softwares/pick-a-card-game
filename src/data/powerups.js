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
    id: "big_show",
    label: "Big Show",
    description: "Reveal all cards for a longer moment.",
    maxTargets: 0, // no card reveal
    rarity: "epic",
  },
  {
    id: "true_sight",
    label: "True Sight",
    description: "Reveal the target card and one decoy briefly.",
    maxTargets: 2,
    rarity: "epic",
  },
];

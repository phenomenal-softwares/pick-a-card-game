export const POWERUPS = [
  {
    id: "peek",
    label: "Peek",
    description: "Reveal one random card briefly.",
    maxTargets: 1,
    rarity: "common",
    icon: {
      pack: "Ionicons",
      name: "remove-circle",
    },
  },
  {
    id: "double_peek",
    label: "Double Peek",
    description: "Reveal two random cards briefly.",
    maxTargets: 2,
    rarity: "rare",
    icon: {
      pack: "Ionicons",
      name: "radio-button-on",
    },
  },
  {
    id: "big_show",
    label: "Big Show",
    description: "Reveal all cards for a longer moment.",
    maxTargets: 0,
    rarity: "epic",
    icon: {
      pack: "Ionicons",
      name: "aperture",
    },
  },
  {
    id: "true_sight",
    label: "True Sight",
    description: "Reveal the target card and one decoy briefly.",
    maxTargets: 2,
    rarity: "epic",
    icon: {
      pack: "Ionicons",
      name: "eye",
    },
  },
];

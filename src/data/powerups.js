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
    price: 100,
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
    price: 250,
  },
  {
    id: "big_show",
    label: "Big Show",
    description: "Reveal all cards for a longer duration.",
    maxTargets: 0,
    rarity: "epic",
    icon: {
      pack: "Ionicons",
      name: "aperture",
    },
    price: 500,
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
    price: 500,
  },
];

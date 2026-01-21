export const POWERUPS = [
  {
    id: "peek",
    label: "Peek",
    description: "Reveal one random card briefly",
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
    label: "50/50",
    description: "Glance at about half of the cards",
    maxTargets: 2,
    rarity: "rare",
    icon: {
      pack: "Ionicons",
      name: "disc",
    },
    price: 250,
  },
  {
    id: "big_show",
    label: "Big Show",
    description: "Show all cards and slow down shuffle",
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
    description: "Reveal the target card and one decoy",
    maxTargets: 2,
    rarity: "epic",
    icon: {
      pack: "Ionicons",
      name: "eye",
    },
    price: 500,
  },
];

export const POWERUP_MAP = Object.fromEntries(
  POWERUPS.map(p => [p.id, p])
);

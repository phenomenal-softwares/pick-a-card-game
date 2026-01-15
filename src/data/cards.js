export const ANIMAL_CARDS = [
  {
    id: 1,
    label: "DOG",
    animal: "dog",
    image: require("../../assets/animals/dog.png"),
    bg: "#F9FAFB",
  },
  {
    id: 2,
    label: "CAT",
    animal: "cat",
    image: require("../../assets/animals/cat.png"),
    bg: "#F3F4F6",
  },
  {
    id: 3,
    label: "LION",
    animal: "lion",
    image: require("../../assets/animals/lion.png"),
    bg: "#FEF3C7",
  },
  {
    id: 4,
    label: "ELEPHANT",
    animal: "elephant",
    image: require("../../assets/animals/elephant.png"),
    bg: "#E5E7EB",
  },
  {
    id: 5,
    label: "MONKEY",
    animal: "monkey",
    image: require("../../assets/animals/monkey.png"),
    bg: "#F3F4F6",
  },
  {
    id: 6,
    label: "FOX",
    animal: "fox",
    image: require("../../assets/animals/fox.png"),
    bg: "#F3F4F6",
  },
  {
    id: 7,
    label: "PANDA",
    animal: "panda",
    image: require("../../assets/animals/panda.png"),
    bg: "#F9FAFB",
  },
  {
    id: 8,
    label: "TIGER",
    animal: "tiger",
    image: require("../../assets/animals/tiger.png"),
    bg: "#F9FAFB",
  },
];

export const CARD_POOLS = {
  EASY: ANIMAL_CARDS.slice(0, 4),
  MEDIUM: ANIMAL_CARDS.slice(0, 6),
  HARD: ANIMAL_CARDS.slice(0, 8),
};

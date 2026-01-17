export const ANIMAL_CARDS = [
  {
    id: 1,
    label: "DOG",
    animal: "dog",
    image: require("../../assets/animals/dog.png"),
  },
  {
    id: 2,
    label: "CAT",
    animal: "cat",
    image: require("../../assets/animals/cat.png"),
  },
  {
    id: 3,
    label: "LION",
    animal: "lion",
    image: require("../../assets/animals/lion.png"),
  },
  {
    id: 4,
    label: "COW",
    animal: "cow",
    image: require("../../assets/animals/cow.png"),
  },
  {
    id: 5,
    label: "MONKEY",
    animal: "monkey",
    image: require("../../assets/animals/monkey.png"),
  },
  {
    id: 6,
    label: "FOX",
    animal: "fox",
    image: require("../../assets/animals/fox.png"),
  },
  {
    id: 7,
    label: "PANDA",
    animal: "panda",
    image: require("../../assets/animals/panda.png"),
  },
  {
    id: 8,
    label: "TIGER",
    animal: "tiger",
    image: require("../../assets/animals/tiger.png"),
  },
  {
    id: 9,
    label: "ELEPHANT",
    animal: "elephant",
    image: require("../../assets/animals/elephant.png"),
  },
];

export const CARD_POOLS = {
  EASY: ANIMAL_CARDS.slice(0, 4),
  MEDIUM: ANIMAL_CARDS.slice(0, 6),
  HARD: ANIMAL_CARDS.slice(0, 9),
};

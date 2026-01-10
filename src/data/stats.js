export const STATS_MODEL = [
  {
    section: "Overview",
    items: [
      {
        id: "gamesPlayed",
        label: "Games Played",
        value: (u) => u.stats.gamesPlayed,
      },
      {
        id: "gamesWon",
        label: "Games Won",
        value: (u) => u.stats.gamesWon,
      },
      {
        id: "gamesLost",
        label: "Games Lost",
        value: (u) => u.stats.gamesPlayed - u.stats.gamesWon,
      },
    ],
  },

  {
    section: "Performance",
    items: [
      {
        id: "totalCorrect",
        label: "Total Correct Picks",
        value: (u) => u.stats.totalCorrect,
      },
      {
        id: "totalWrong",
        label: "Total Wrong Picks",
        value: (u) => u.stats.totalWrong,
      },
      {
        id: "accuracy",
        label: "Accuracy",
        value: (u) => {
          const total =
            u.stats.totalCorrect + u.stats.totalWrong;
          if (total === 0) return "—";
          return `${Math.round(
            (u.stats.totalCorrect / total) * 100
          )}%`;
        },
      },
    ],
  },

  {
    section: "Mastery",
    items: [
      {
        id: "flawlessWins",
        label: "Flawless Wins",
        value: (u) => u.stats.flawlessWins || 0,
      },
      {
        id: "highestEasy",
        label: "Highest Score (Easy)",
        value: (u) => u.highScores.EASY,
      },
      {
        id: "highestMedium",
        label: "Highest Score (Medium)",
        value: (u) => u.highScores.MEDIUM,
      },
      {
        id: "highestHard",
        label: "Highest Score (Hard)",
        value: (u) => u.highScores.HARD,
      },
    ],
  },
];

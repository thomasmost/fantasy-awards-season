const subtitles = [
  "Hi Barbie",
  "Now I am Become Death, the Destroyer of Film",
  "You're telling me a Flower Mooned these Killers?",
  "Now I am Become Death, the Destroyer of this League",
  "Coyote wants money... 😏",
  "Sheeeeet",
  "Just one more award show... it's getting more real...",
  "This is just what grown-ups do (compete in Awards Season Fantasy Leagues)",
];

const getRandFromRng = (rng: string[]) => {
  const optionCount = rng.length;
  return rng[Math.floor(Math.random() * optionCount)];
};

const tauntFirsts = (firstPlace: string) => {
  return [
    `${firstPlace}, no one is more Nyad than you!`,
    `Okay ${firstPlace}, leave some for the rest of us!`,
  ];
};

export const trashTalk = (data?: any) => {
  if (data) {
    const { ranking } = data;
    let topPlayer: { player: string; points: number } | null = null;
    for (const player of Object.keys(ranking)) {
      if (!topPlayer) {
        topPlayer = { player, points: ranking[player] };
        continue;
      }
      if (topPlayer.points < ranking[player]) {
        topPlayer = { player, points: ranking[player] };
      }
    }
    if (topPlayer) {
      let name = topPlayer.player;
      let parts = name.split(" ");
      if (name.indexOf("&") !== -1) {
        name = `${parts[0]} & ${parts[3]}`;
      } else {
        name = parts[0];
      }
      return getRandFromRng(subtitles.concat(tauntFirsts(name)));
    }
  }
  return getRandFromRng(subtitles);
};

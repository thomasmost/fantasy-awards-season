const subtitles = [
  "I think we can all agree we have to beat Eric... for good.",
  "Bug on Yorgos. Bug on!",
  "At least we have 'Mopey \"Shakespeare in Love\"'...",
  "So sweet, so easy on the eyes... but hideous on the inside!",
  "*googles 'What movies came out this year?'*",
  "It's okay that you're losing; your team has Sentimental Value"
];

const getRandFromRng = (rng: string[]) => {
  const optionCount = rng.length;
  return rng[Math.floor(Math.random() * optionCount)];
};

const tauntFirsts = (firstPlace: string) => {
  return [
    `${firstPlace} just had a few small beers...`,
    `${firstPlace} is DEFYING GRAVITY (Part Two)!`,
    `${firstPlace}, you're gonna be golden!`,
    `${firstPlace}, listen, you can still be with the Wizard...`,
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

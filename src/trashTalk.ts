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
    `${firstPlace} is DEFYING GRAVITY (Part Two)!`,
    `${firstPlace}, you're gonna be golden!`,
    `${firstPlace}, listen, you can still be with the Wizard...`,
    `Okay ${firstPlace}, leave some for the rest of us!`,
  ];
};

const tauntLasts = (lastPlace: string) => {
  return [
    `${lastPlace} just had a few small beers...`,
    `${lastPlace}, don't worry, this is just a practice league!`,
    `Hang in there, ${lastPlace}, all these indie awards were just lulling us into a false sense of security!`,
    `Cheer up, ${lastPlace}, I think your movies will have a second life on VHS!`,
  ];
};

export const trashTalk = (data?: any) => {
  let trashTalk = subtitles;
  if (data) {
    const { ranking } = data;
    let topPlayer: { player: string; points: number } | null = null;
    let bottomPlayer: { player: string; points: number } | null = null;
    for (const player of Object.keys(ranking)) {
      if (!topPlayer) {
        topPlayer = { player, points: ranking[player] };
        continue;
      }
      if (!bottomPlayer) {
        bottomPlayer = { player, points: ranking[player] };
        continue;
      }
      if (bottomPlayer.points > ranking[player]) {
        bottomPlayer = { player, points: ranking[player] };
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
      trashTalk = trashTalk.concat(tauntFirsts(name));
    }
    if (bottomPlayer) {
      let name = bottomPlayer.player;
      let parts = name.split(" ");
      if (name.indexOf("&") !== -1) {
        name = `${parts[0]} & ${parts[3]}`;
      } else {
        name =  parts[0];
      }
      trashTalk = trashTalk.concat(tauntLasts(name));
    }
  }
  return getRandFromRng(trashTalk);
};

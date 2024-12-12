const subtitles = [
  "More like Brutalista",
  "More like Problemopolis",
  "You gotta get in the dirt Justice something ain't adding up",
  "My Old Ass. That's it, that's the tweet.",
  "You might be better off learning FileMaker Pro",
  "🎶 No Good Movies... Will Jon Chu Do... ! 🎶",
  "No one votes for Wicked! (oh no oh wait oh god)",
  "I hope you're happy!",
  "I told ya",
  "LET'S GO!",
  "COME ON!",
  "Who else tryna do a Brutalopolis this weekend?",
  "Who else tryna do a Brutalopulance this weekend?",
  "I heard a rumor that Patrick is on The Substance...",
  "I heard a rumor that Holly is on The Spice...",
];

const getRandFromRng = (rng: string[]) => {
  const optionCount = rng.length;
  return rng[Math.floor(Math.random() * optionCount)];
};

const tauntFirsts = (firstPlace: string) => {
  return [
    `I heard a rumor that ${firstPlace} is on The Substance...`,
    `${firstPlace} is DEFYING GRAVITY!!!`,
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

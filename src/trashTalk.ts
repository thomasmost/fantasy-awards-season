const subtitles = [
  "Let the trash talk commence",
  "Let the trash talk commence",
  "May the odds be ever in Pig's favor",
  "Clashe of the Titanes",
  "It's gonna make one helluva (West Side) story",
  '"Licorice Pizza?!?" I\'ll take five!',
  "yeah yeah yeah DUNE",
  "Kyle can have a little Lamb, as a treat!",
  "Desert power...",
  "Clifford the Big Red Special Effects Category",
  "Don't Look Up your odds of winning this...",
  "The name's Alley... Nightmare Alley",
  "tick... tick... Bazinga!",
  "It's time to take out the trash.",
  "It's time to take out the trash!",
  'Think "Free Guy" will walk away with anything?',
  "Baby Annette IS just a baby after all",
  "Belfast and the BELFURIOUS!",
  "You have to be able to... vote for movies... that you hate.",
  "The Power of the Doge 🚀",
];

const getRandFromRng = (rng: string[]) => {
  const optionCount = rng.length;
  return rng[Math.floor(Math.random() * optionCount)];
};

const tauntFirsts = (firstPlace: string) => {
  return [
    `${firstPlace}, slow down, you're making me sick`,
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
      if (name.indexOf("&")) {
        name = `${parts[0]} & ${parts[3]}`;
      } else {
        name = parts[0];
      }
      return getRandFromRng(subtitles.concat(tauntFirsts(name)));
    }
  }
  return getRandFromRng(subtitles);
};

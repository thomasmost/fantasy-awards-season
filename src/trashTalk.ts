const subtitles = [
  "Let the trash talk commence",
  "Let the trash talk commence",
  "This year's really defying all X-pectations",
  "So who's going to The Fabelmans' for Thanksgiving??",
  "Every-nom, every-win, all at once!!!",
  `So who's excited for "Avatar: Wakanda Forever"?`,
  `So who's excited for "Black Panther: The Way of Water"?`,
  "RISE UP, TÁR-NATION!",
  `Thomas really went all in on "Babylon," huh?`,
  "Daylight savings time has me operating PRIMARILY Aftersun, amirite??",
  'Think "Sonic 2" will walk away with anything?',
  `Don't worry Caitlin... you have at least one good movie`,
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

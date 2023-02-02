const subtitles = [
  "Let the trash talk commence",
  "Let the trash talk commence",
  "This year's really defying all X-pectations",
  "So who's going to The Fabelmans' for Thanksgiving??",
  "Every-nom, every-win, all at once!!!",
  `So who's excited for "Avatar: Wakanda Forever"?`,
  `So who's excited for "Black Panther: The Way of Water"?`,
  "What in TÁR-NATION!?",
  `Thomas really went all in on "Babylon," huh?`,
  "Daylight savings time has me operating PRIMARILY Aftersun, amirite??",
  'Think "Sonic 2" will walk away with anything?',
  `A lot of people are saying "Babylon" got robbed!!`,
  `A lot of people are saying "Babylon" should have at least been nominated for Best Picture!!`,
  `A lot of people are saying "Babylon" should win Best Picture, even after not being nominated!!`,
  `A lot of people are saying "Babylon" is really good, actually!!`,
  `Crying, screaming, throwing up (BABYLON, 2022)`,
  `Crying, screaming, throwing up (BABYLON, 2022)`,
  `Crying, screaming, throwing up (BABYLON, 2022)`,
  `The Academy needs to watch "Babylon" again and think about what they've done`,
  `Crying, screaming, throwing up at the "Babylon" snub`,
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

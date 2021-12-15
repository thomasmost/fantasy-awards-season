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
  "Isabel & Eric, slow down, you're making me sick",
];

const getRandFromRng = (rng: string[]) => {
  const optionCount = rng.length;
  return rng[Math.floor(Math.random() * optionCount)];
};

export const trashTalk = () => getRandFromRng(subtitles);

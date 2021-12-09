export async function loadData(
  setData: React.Dispatch<React.SetStateAction<undefined>>,
  setDisplayDictionary: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
) {
  const response = await fetch(".netlify/functions/tunnel");
  const data = await response.json();
  const displayDictionary: Record<string, boolean> = {};
  for (const player of data.playerWinnings) {
    displayDictionary[player.player] = true;
  }
  setData(data);
  setDisplayDictionary(displayDictionary);
}

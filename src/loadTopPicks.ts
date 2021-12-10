export async function loadTopPicks(
  setData: React.Dispatch<React.SetStateAction<undefined>>
) {
  const response = await fetch(".netlify/functions/top_picks");
  const data = await response.json();
  console.log(data);
  setData(data);
}

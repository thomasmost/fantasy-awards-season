import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  XYChart,
} from "@visx/xychart";
import { PlayerWinnings } from "../types/PlayerWinnings";
import { PlayerLine } from "./PlayerLine";

type FantasyData = {
  votingBodies: string[];
  playerWinnings: PlayerWinnings[];
};

interface ChartProps {
  data: FantasyData;
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const { votingBodies, playerWinnings } = data;
  const playerOne = playerWinnings[0];
  const lines = [];
  for (const player of playerWinnings) {
    lines.push(<PlayerLine votingBodies={votingBodies} data={player} />);
  }
  return (
    <XYChart height={600} xScale={{ type: "band" }} yScale={{ type: "linear" }}>
      <AnimatedAxis orientation="bottom" />
      <AnimatedGrid columns={false} numTicks={4} />
      {lines}
    </XYChart>
  );
};

import { AnimatedLineSeries } from "@visx/xychart";
import { PlayerWinnings } from "../types/PlayerWinnings";

type DataXY = {
  x: string;
  y: number;
};

interface PlayerLineProps {
  data: PlayerWinnings;

  votingBodies: string[];
}

const accessors = {
  xAccessor: (d: DataXY) => d.x,
  yAccessor: (d: DataXY) => d.y,
};

export const PlayerLine: React.FC<PlayerLineProps> = ({
  data,
  votingBodies,
}) => {
  const player = data;
  const playerName = player.player;
  const dataPointsLength = votingBodies.length;
  const dataPoints = [];
  let total = 0;
  for (let i = 0; i < dataPointsLength; i++) {
    total += player.points[i];
    dataPoints.push({
      x: votingBodies[i],
      y: total,
    });
  }
  return (
    <AnimatedLineSeries dataKey={playerName} data={dataPoints} {...accessors} />
  );
};

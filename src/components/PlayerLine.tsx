import { curveMonotoneX } from "@visx/curve";
import { AnimatedLineSeries } from "@visx/xychart";
import { PlayerWinnings } from "../types/PlayerWinnings";

type DataXY = {
  x: string;
  y: number;
};

interface PlayerLineProps {
  data: PlayerWinnings;
  hidden?: boolean;
  votingBodies: string[];
}

const accessors = {
  xAccessor: (d: DataXY) => d.x,
  yAccessor: (d: DataXY) => d.y,
};

export const PlayerLine: React.FC<PlayerLineProps> = ({
  data,
  hidden,
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
      y: hidden ? 0 : total,
    });
  }
  return (
    <AnimatedLineSeries
      style={
        hidden
          ? {
              transition: ".5s",
            }
          : {}
      }
      fillOpacity={hidden ? 0 : 1}
      strokeOpacity={hidden ? 0 : 1}
      opacity={hidden ? 0 : 1}
      // visibility={hidden ? 'hidden' : undefined}
      curve={curveMonotoneX}
      dataKey={playerName}
      data={dataPoints}
      {...accessors}
    ></AnimatedLineSeries>
  );
};

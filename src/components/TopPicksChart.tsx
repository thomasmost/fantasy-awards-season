// VisX
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisBottom } from "@visx/axis";

type TopScoringPick = {
  category: string;
  pick: string;
  pointsScored: number;
  owner: string;
};

type TopPicksData = {
  topTenPicks: TopScoringPick[];
};

interface ChartProps {
  data: TopPicksData;
  width: number;
  height: number;
}

export const TopPicksChart: React.FC<ChartProps> = ({
  data,
  width,
  height,
}) => {
  // We'll use some mock data from `@visx/mock-data` for this.
  const { topTenPicks } = data;

  // Define the graph dimensions and margins
  const margin = { top: 40, bottom: 40, left: 20, right: 20 };

  // Then we'll create some bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // We'll make some helpers to get at the data we want
  const x = (d: TopScoringPick) => d.pick;
  const y = (d: TopScoringPick) => d.pointsScored;

  // And then scale the graph by our data
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: topTenPicks.map(x),
    padding: 0.6,
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...topTenPicks.map(y))],
  });

  // Compose together the scale and accessor functions to get point functions
  const compose =
    (scale: any, accessor: any) => (topTenPicks: TopScoringPick[]) =>
      scale(accessor(topTenPicks));
  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);

  return height < 10 ? null : (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        {topTenPicks.map((d: TopScoringPick, i: number) => {
          const barHeight = yMax - (yPoint(d as any) ?? 0);
          return (
            <Bar
              key={`bar-${i}`}
              x={xPoint(d as any)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="#ccaa63"
              rx={4}
            />
          );
        })}
      </Group>
      <AxisBottom
        top={yMax + margin.top}
        left={margin.left}
        scale={xScale}
        numTicks={width < 500 ? 5 : 10}
        tickLabelProps={(value, index) => ({
          fill: "black",
          fontSize: 16,
          textAnchor: "start",
          transform: "rotate(-90 " + xScale(value) + ",0)",
        })}
      />
    </svg>
  );
};

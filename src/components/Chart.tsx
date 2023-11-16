import styled from "@emotion/styled";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  Tooltip,
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
  displayDictionary: Record<string, boolean>;
}

const TooltipContainer = styled.div`
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 4px;
  color: #222222;

  .date {
    font-size: 12px;
    margin-bottom: 8px;
    color: #222222;
    font-weight: 600;
  }
  .value {
    display: flex;
    align-items: center;
    font-weight: 400;
    color: #000000;
  }
`;

const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
};

const ColoredSquare = styled.div`
  display: inline-block;
  width: 11px;
  height: 11px;
  margin-right: 8px;
  background: ${({ color }) => color};
  border-radius: 4px;
`;

export const Chart: React.FC<ChartProps> = ({ data, displayDictionary }) => {
  const mobile = useMediaQuery("(max-width:600px)");
  const { votingBodies, playerWinnings } = data;
  const lines = [];

  votingBodies.unshift("Draft");
  // add a zero point to each player at the beginning of their data
  for (const player of playerWinnings) {
    player.points.unshift(0);
  }
  for (const player of playerWinnings) {
    if (!displayDictionary[player.player]) {
      lines.push(
        <PlayerLine
          key={player.player}
          hidden
          votingBodies={votingBodies}
          data={player}
        />
      );
      continue;
    }
    lines.push(
      <PlayerLine
        key={player.player}
        votingBodies={votingBodies}
        data={player}
      />
    );
  }
  return (
    <XYChart
      height={mobile ? 360 : 500}
      xScale={{ type: "band" }}
      yScale={{ type: "linear" }}
    >
      <AnimatedAxis orientation="left" />
      {/* <AnimatedAxis tickComponent={() => null} orientation="bottom" /> */}

      <AnimatedGrid columns={false} numTicks={4} />
      {lines}

      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showDatumGlyph
        renderTooltip={({ tooltipData, colorScale }) => {
          if (!colorScale) {
            return null;
          }
          if (!tooltipData) {
            return null;
          }
          if (!displayDictionary[tooltipData?.nearestDatum?.key || ""]) {
            return null;
          }
          return (
            <TooltipContainer>
              {[tooltipData?.nearestDatum].map((lineData) => {
                if (!lineData) {
                  return null;
                }
                const { key, datum } = lineData;

                return (
                  <div className="row" key={key}>
                    <div className="player" style={{ marginBottom: "10px" }}>
                      {key}
                    </div>
                    {/* <div className="nada">
                        {accessors.xAccessor(value.datum)}
                      </div> */}
                    <div className="value" style={{ marginBottom: "10px" }}>
                      <ColoredSquare
                        color={colorScale(
                          tooltipData?.nearestDatum?.key as string
                        )}
                      />
                      {accessors.yAccessor(datum)}
                    </div>
                    <div>
                      <em>{accessors.xAccessor(datum)}</em>
                    </div>
                  </div>
                );
              })}
            </TooltipContainer>
          );
        }}
      />
    </XYChart>
  );
};

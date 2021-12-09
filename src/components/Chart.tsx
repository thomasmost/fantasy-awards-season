import styled from "@emotion/styled";
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

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const { votingBodies, playerWinnings } = data;
  const lines = [];
  for (const player of playerWinnings) {
    lines.push(<PlayerLine votingBodies={votingBodies} data={player} />);
  }
  return (
    <XYChart height={600} xScale={{ type: "band" }} yScale={{ type: "linear" }}>
      <AnimatedAxis orientation="bottom" />
      <AnimatedGrid columns={false} numTicks={4} />
      {lines}

      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showSeriesGlyphs
        glyphStyle={{
          fill: "#008561",
          strokeWidth: 0,
        }}
        renderTooltip={({ tooltipData }) => {
          console.log(tooltipData);
          return (
            <TooltipContainer>
              {Object.entries(tooltipData?.datumByKey || {}).map(
                (lineDataArray) => {
                  const [key, value] = lineDataArray;

                  return (
                    <div className="row" key={key}>
                      <div className="player">{key}</div>
                      {/* <div className="nada">
                        {accessors.xAccessor(value.datum)}
                      </div> */}
                      <div className="value" style={{ marginBottom: "10px" }}>
                        <ColoredSquare color="#008561" />
                        {accessors.yAccessor(value.datum)}
                      </div>
                    </div>
                  );
                }
              )}
            </TooltipContainer>
          );
        }}
      />
    </XYChart>
  );
};

import { LegendOrdinal } from "@visx/legend";
import { DataContext } from "@visx/xychart";
import { MouseEventHandler, useContext } from "react";

interface ChartLegendProps {
  displayDictionary: Record<string, boolean>;
  onToggle: (name: string) => void;
}

export const ChartLegend: React.FC<ChartLegendProps> = ({
  displayDictionary,
  onToggle,
}) => {
  const { colorScale, theme, margin } = useContext(DataContext);

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    onToggle((e.target as any).innerText);
  };

  return (
    <LegendOrdinal
      direction="row"
      itemMargin="8px 8px 8px 0"
      scale={colorScale as any}
      labelFormat={
        ((label: string) =>
          displayDictionary[label]
            ? label
            : label + " (hidden)") as unknown as any
      }
      legendLabelProps={{ onClick }}
      shape="line"
      style={{
        cursor: "pointer",
        fontSize: ".6em",
        textAlign: "left",
        backgroundColor: theme?.backgroundColor,
        marginTop: -24,
        paddingLeft: margin?.left,
        // color: 'white',
        marginBottom: "40px",
        display: "flex", // required in addition to `direction` if overriding styles
      }}
    />
  );
};

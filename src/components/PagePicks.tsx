import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import { LoadingGraphic } from "./Loading";
import { loadTopPicks } from "../loadTopPicks";
import { TopPicksChart } from "./TopPicksChart";

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  width: 100%;
  height: 500px;
  min-height: 500px;
`;

export const PagePicks = () => {
  const [data, setData] = useState();
  const mobile = useMediaQuery("(max-width:800px)");

  useEffect(() => {
    loadTopPicks(setData);
  }, [setData]);

  const loading = !data;

  return (
    <>
      {loading && <LoadingGraphic />}
      {!loading && (
        <>
          <h2>Top Earning Picks</h2>
          <Container>
            <ParentSize>
              {({ height, width }) => (
                <TopPicksChart height={height} width={width} data={data} />
              )}
            </ParentSize>
          </Container>
        </>
      )}
    </>
  );
};

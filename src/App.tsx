import { useEffect, useState } from "react";
import "./App.css";
import { Chart } from "./components/Chart";
import styled from "@emotion/styled";
import { DataProvider } from "@visx/xychart";
import { ChartLegend } from "./components/ChartLegend";
import { useMediaQuery } from "@mui/material";
import { LoadingGraphic } from "./components/Loading";
import { Header } from "./components/Header";
import { useInterval } from "./useInterval";
import { trashTalk } from "./trashTalk";
import { loadData } from "./loadData";

const Footer = styled.footer`
  background-position: center;
  background-repeat: no-repeat;
  height: 60px;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
`;

const Caption = styled.div`
  margin-bottom: 50px;
`;

function App() {
  const [data, setData] = useState();
  const [subtitle, setSubtitle] = useState(trashTalk());
  const [displayDictionary, setDisplayDictionary] = useState<
    Record<string, boolean>
  >({});
  const mobile = useMediaQuery("(max-width:800px)");

  useEffect(() => {
    loadData(setData, setDisplayDictionary);
  }, [setData]);

  useInterval(() => {
    setSubtitle(trashTalk());
  }, 10000);

  const onToggle = (name: string) => {
    const newDisplayDictionary = { ...displayDictionary };
    if (name.indexOf("(hidden)") > -1) {
      name = name.substring(0, name.length - 9);
    }
    newDisplayDictionary[name] = !newDisplayDictionary[name];
    setDisplayDictionary(newDisplayDictionary);
  };

  const loading = !data;

  return (
    <div className="App">
      <Header />
      <main>
        {loading && <LoadingGraphic />}
        {!loading && (
          <>
            <Container>
              <DataProvider
                // these props have been moved from XYChart to DataProvider
                // this allows us to move DataContext up a level such that we can
                // render an HTML legend that uses DataContext and an SVG chart
                // without doing this you would have to render XYChart as a child
                // of XYChart, which would then require the legend to be SVG-based
                // because HTML cannot be a child of SVG
                xScale={{ type: "band", paddingInner: 0.5 }}
                yScale={{ type: "linear" }}
              >
                <Chart data={data} displayDictionary={displayDictionary} />
                {!mobile && (
                  <ChartLegend
                    onToggle={onToggle}
                    displayDictionary={displayDictionary}
                  />
                )}
              </DataProvider>
            </Container>
            <Caption>
              <em>{subtitle}</em>
            </Caption>
          </>
        )}
      </main>
      <Footer className="App-footer" />
    </div>
  );
}

export default App;

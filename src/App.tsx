import { useEffect, useState } from "react";
import "./App.css";
import boy from "./angelboy.png";
import { Chart } from "./components/Chart";
import styled from "@emotion/styled";
import { DataProvider } from "@visx/xychart";
import { ChartLegend } from "./components/ChartLegend";
import { useMediaQuery } from "@mui/material";

async function loadData(
  setData: React.Dispatch<React.SetStateAction<undefined>>,
  setDisplayDictionary: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
) {
  const response = await fetch(".netlify/functions/tunnel");
  const data = await response.json();
  const displayDictionary: Record<string, boolean> = {};
  for (const player of data.playerWinnings) {
    displayDictionary[player.player] = true;
  }
  setData(data);
  setDisplayDictionary(displayDictionary);
}

const Header = styled.header`
  background-position: center;
  background-repeat: no-repeat;
  color: #1b4586;
`;

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

const Svg = styled.svg`
  margin-top: 100px;
`;

const getRandFromRng = (rng: string[]) => {
  const optionCount = rng.length;
  return rng[Math.floor(Math.random() * optionCount)];
};

const subtitles = [
  "Let the trash talk commence",
  "May the odds be ever in Pig's favor",
  "Clashe of the Titanes",
  "It's gonna make one helluva (West Side) story",
  '"Licorice Pizza?!?" I\'ll take five!',
  "yeah yeah yeah DUNE",
];

function App() {
  const [data, setData] = useState();
  const [displayDictionary, setDisplayDictionary] = useState<
    Record<string, boolean>
  >({});
  const mobile = useMediaQuery("(max-width:800px)");

  useEffect(() => {
    loadData(setData, setDisplayDictionary);
  }, [setData]);

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
      <div className="App-header-wrapper-lol">
        <img src={boy} alt="Fantasy Film Awards" />
        <Header className="App-header">
          {/* <h1>Fantasy Film Awards, 2021</h1> */}
        </Header>
      </div>
      <main>
        {loading && (
          <Svg
            width="400"
            height="400"
            viewBox="0 0 45 45"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#86c6ee"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              transform="translate(1 1)"
              stroke-width="2"
            >
              <circle cx="22" cy="22" r="6" stroke-opacity="0">
                <animate
                  attributeName="r"
                  begin="1.5s"
                  dur="3s"
                  values="6;22"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  begin="1.5s"
                  dur="3s"
                  values="1;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-width"
                  begin="1.5s"
                  dur="3s"
                  values="2;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="22" cy="22" r="6" stroke-opacity="0">
                <animate
                  attributeName="r"
                  begin="3s"
                  dur="3s"
                  values="6;22"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  begin="3s"
                  dur="3s"
                  values="1;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-width"
                  begin="3s"
                  dur="3s"
                  values="2;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="22" cy="22" r="8">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="1.5s"
                  values="6;1;2;3;4;5;6"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </Svg>
        )}
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
              <em>{getRandFromRng(subtitles)}</em>
            </Caption>

            <Footer className="App-header-wrapper-lol" />
          </>
        )}
      </main>
    </div>
  );
}

export default App;

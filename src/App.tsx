import { useEffect, useState } from "react";
import "./App.css";
import { Chart } from "./components/Chart";
import styled from "@emotion/styled";

async function loadData(
  setData: React.Dispatch<React.SetStateAction<undefined>>
) {
  const response = await fetch(".netlify/functions/tunnel");
  const data = await response.json();
  setData(data);
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

  useEffect(() => {
    loadData(setData);
  }, [setData]);

  const loading = !data;

  return (
    <div className="App">
      <div className="App-header-wrapper-lol">
        <Header className="App-header">
          <h1>Fantasy Film Awards, 2021</h1>
        </Header>
      </div>
      {!loading && (
        <>
          <Container>
            <Chart data={data} />
          </Container>
          <Caption>
            <em>{getRandFromRng(subtitles)}</em>
          </Caption>

          <Footer className="App-header-wrapper-lol" />
        </>
      )}
    </div>
  );
}

export default App;

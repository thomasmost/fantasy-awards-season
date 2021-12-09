import { useEffect, useState } from "react";
import "./App.css";
import { Chart } from "./components/Chart";
import background from "../static/header.png";
import styled from "@emotion/styled";

async function loadData(
  setData: React.Dispatch<React.SetStateAction<undefined>>
) {
  const response = await fetch(".netlify/functions/tunnel");
  const data = await response.json();
  setData(data);
}

const Header = styled.header`
  background-color: #2975bb;
  background-position: center;
  background-repeat: no-repeat;
  color: #1b4586;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
`;

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    loadData(setData);
  }, [setData]);

  const loading = !data;

  return (
    <div className="App">
      <Header className="App-header">
        <h1>Fantasy Film Awards, 2021</h1>
      </Header>
      <Container>{!loading && <Chart data={data} />}</Container>
    </div>
  );
}

export default App;

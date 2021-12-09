import { useEffect, useState } from "react";
import "./App.css";
import { Chart } from "./components/Chart";

async function loadData(
  setData: React.Dispatch<React.SetStateAction<undefined>>
) {
  const response = await fetch(".netlify/functions/tunnel");
  const data = await response.json();
  setData(data);
}

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    loadData(setData);
  }, [setData]);

  const loading = !data;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fantasy Film Awards, 2021</h1>
      </header>

      {!loading && <Chart data={data} />}
    </div>
  );
}

export default App;

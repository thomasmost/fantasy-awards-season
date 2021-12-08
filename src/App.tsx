import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

async function loadData(
  setData: React.Dispatch<React.SetStateAction<undefined>>
) {
  const response = await fetch(".netlify/functions/tunnel");
  const data = await response.json();
  alert(JSON.stringify(data));
  setData(data);
}

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    loadData(setData);
  }, [setData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

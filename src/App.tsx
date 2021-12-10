import "./App.css";
import styled from "@emotion/styled";
import { Header } from "./components/Header";
import { PageHome } from "./components/PageHome";
import { Link, Route, Routes } from "react-router-dom";
import { PagePicks } from "./components/PagePicks";

const Main = styled.main`
  height: 800px;
`;

const Footer = styled.footer`
  background-position: center;
  background-repeat: no-repeat;
  height: 60px;
`;
function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/picks">Top Picks</Link>
        </nav>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="picks" element={<PagePicks />} />
        </Routes>
      </Main>
      <Footer className="App-footer" />
    </div>
  );
}

export default App;

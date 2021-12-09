import styled from "@emotion/styled";
import boy from "../angelboy.png";

const StyledHeader = styled.header`
  background-position: center;
  background-repeat: no-repeat;
  color: #1b4586;
`;

export const Header = () => (
  <div className="App-header-wrapper-lol">
    <img src={boy} alt="Fantasy Film Awards" />
    <StyledHeader className="App-header">
      {/* <h1>Fantasy Film Awards, 2021</h1> */}
    </StyledHeader>
  </div>
);

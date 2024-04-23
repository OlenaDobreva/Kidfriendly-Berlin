import Navigation from "./Navigation";
import styled from "styled-components";

const StyledLayout = styled.div`
  background-image: url("/background.png");
  background-size: 50%;
  background-repeat: repeat;
  background-color: rgb(230, 187, 192);
  min-height: 100vh;
`;

export default function Layout({ children }) {
  return (
    <StyledLayout>
      <Navigation />
      {children}
    </StyledLayout>
  );
}

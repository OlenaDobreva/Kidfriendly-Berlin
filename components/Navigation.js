import Link from "next/link";
import styled from "styled-components";

const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  list-style-type: none;
  position: fixed;
  width: 100%;
  background-color: #fdfdfd;
  bottom: 0;
  padding: 30px;
  margin-bottom: 0;
  font-size: 18px;
`;

export default function Navigation() {
  return (
    <StyledList>
      <li>
        <Link href="/">Homepage</Link>
      </li>
      <li>
        <Link href="/details">Details page</Link>
      </li>
      <li>
        <Link href="/create">Add new kidfriendly place</Link>
      </li>
    </StyledList>
  );
}

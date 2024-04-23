import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  list-style-type: none;
  width: 100%;
  height: 70px;
  background-color: rgb(205, 231, 152);
  padding: 5px;
  // position: fixed;
`;

export default function Navigation() {
  return (
    <StyledList>
      <li>
        <Link href="/">
          <Image height={65} width={65} alt="home icon" src="/home.png" />
        </Link>
      </li>
      <li>
        <Link href="/favorite">
          <Image
            height={65}
            width={65}
            alt="favorite icon"
            src="/balloons.png"
          />
        </Link>
      </li>
      <li>
        <Link href="/create">
          <Image height={80} width={95} alt="create icon" src="/create.png" />
        </Link>
      </li>
      <li>
        <Link href="/login">
          <Image height={65} width={65} alt="login icon" src="/login2.png" />
        </Link>
      </li>
    </StyledList>
  );
}

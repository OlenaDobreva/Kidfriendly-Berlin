import { useRouter } from "next/router";
import styled from "styled-components";
import Form from "@/components/Form";
import "@fontsource/ribeye";

const StyledLink = styled.a`
  color: blue;
  text-decoration: underline;
  margin-top: 10px;
  transition: color 0.2s;

  &:hover {
    color: darkblue;
  }
`;

const StyledHeading = styled.h2`
  margin: 20px;
  color: rgb(21, 20, 20);
  font-family: "Ribeye";
`;

export default function CreatePlacePage() {
  const router = useRouter();

  return (
    <>
      <StyledHeading id="add-place">Add New Place</StyledHeading>
      <Form />

      <StyledLink href="/">Go Back</StyledLink>
    </>
  );
}

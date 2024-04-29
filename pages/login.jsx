import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import Image from "next/image";
import styled from "styled-components";
import "@fontsource/ribeye";

const StyledButton = styled.button`
  background-color: lightgray;
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
  color: black;
  text-decoration: none;
  font-weight: bold;
  border: 2px solid darkgray;
  font-size: inherit;
  width: 90px;
`;

const StyledHeading = styled.h2`
  margin: 20px;
  color: rgb(21, 20, 20);
  font-family: "Ribeye";
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  border: 2px solid lightblue;
  background-color: rgb(237, 241, 241);
  gap: 10px;
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
`;

export default function Login() {
  const { data: session } = useSession();
  console.log("session", session);
  if (session) {
    return (
      <StyledForm>
        <StyledHeading>Login</StyledHeading>
        <p>
          <strong>Welcome 🍭, {session.user.email}</strong>
        </p>
        <img
          src={session.user.image}
          alt=""
          style={{ borderRadius: "5px" }}
          width={100}
        ></img>
        <StyledButton onClick={() => signOut()}>Sign out</StyledButton>
      </StyledForm>
    );
  } else {
    return (
      <StyledForm>
        <StyledHeading>Login</StyledHeading>
        You are not signed in yet <br />
        <Image height={250} width={260} alt="sign in icon" src="/signin.png" />
        <p>You can login here ⬇️</p>
        <StyledButton onClick={() => signIn()}>Sign in</StyledButton>
      </StyledForm>
    );
  }
}

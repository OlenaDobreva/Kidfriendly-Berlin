import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <p>Welcome, {session.user.email}</p>
        <img
          src={session.user.image}
          alt=""
          style={{ borderRadius: "50px" }}
        ></img>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
}

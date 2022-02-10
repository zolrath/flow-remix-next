import "../flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return {
    title: "FCL Quickstart with Remix",
    description: "My first web3 app on Flow!"
  };
};

export default function Home() {
  const [user, setUser] = useState({loggedIn: null})

  useEffect(() => fcl.currentUser.subscribe(setUser), [])

  const AuthedState = () => {
    return (
      <div>
        <div>Address: {user?.addr ?? "No Address"}</div>
        <button onClick={fcl.unauthenticate}>Log Out</button>
      </div>
    )
  }

  const UnauthenticatedState = () => {
    return (
      <div>
        <button onClick={fcl.logIn}>Log In</button>
        <button onClick={fcl.signUp}>Sign Up</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Flow App</h1>
      {user.loggedIn
        ? <AuthedState />
        : <UnauthenticatedState />
      }
    </div>
  );
}

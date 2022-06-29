import type { NextPage } from "next";
import { useState } from "react";
import { useUser } from "../utils/useUser";
import Landing from "./Landing";

const Home: NextPage = () => {
  const { authenticatedState, userDetails } = useUser();
  const [user, raiseUser] = useState<Object | null>(null);
  console.log("auth", authenticatedState);
  if (authenticatedState === "authenticated" && user) {
    console.log("userd", userDetails);
    console.log("user", user);
    if (!userDetails) {
      createUserRequest(user);
    }
  }
  async function createUserRequest(user: Object) {
    const response = await fetch("/api/create-user", {
      method: "POST",
      body: JSON.stringify(user),
    });
    console.log("response", response);
  }

  return authenticatedState === "authenticated" ? <div>Auth</div> : <Landing raiseUser={raiseUser}></Landing>;
};

export default Home;

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { supabase } from "../../client";
import { useUser } from "../utils/useUser";
import Auth from "./Auth";
import ChooseName from "./ChooseName";
import Landing from "./Landing";

const Home: NextPage = () => {
  const { authenticatedState, userDetails } = useUser();

  if (!userDetails) {
    return <h3>Loading...</h3>;
  }

  if (authenticatedState === "not-authenticated") {
    return <Landing></Landing>;
  }

  return userDetails?.name ? <Auth></Auth> : <ChooseName userId={userDetails?.id}></ChooseName>;
};

export default Home;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { supabase } from "../../client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { MyUserContextProvider } from "../utils/useUser";

export type AuthState = "authenticated" | "not-authenticated";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] = useState<AuthState>("not-authenticated");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session);
      if (event === "SIGNED_IN") {
        console.log("e", event, session);
        setAuthenticatedState("authenticated");
        if (session) {
          setUser(session.user);
        }
      }
      if (event === "SIGNED_OUT") {
        setAuthenticatedState("not-authenticated");
      }
    });
    checkUser();
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setAuthenticatedState("authenticated");
      setUser(user);
    }
  }

  async function handleAuthChange(event: AuthChangeEvent, session: Session | null) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  return (
    <MyUserContextProvider supabaseClient={supabase} user={user} authenticatedState={authenticatedState}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MyUserContextProvider>
  );
}
export default MyApp;

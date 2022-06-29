import Head from "next/head";
import { ReactNode, useEffect } from "react";
import Header from "./ui/Header";
import { AuthState } from "../pages/_app";
interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Poker Voter</title>
        <meta name="description" content="Vote on ticket size" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
}

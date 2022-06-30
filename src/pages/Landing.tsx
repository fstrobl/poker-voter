import { ChangeEvent, DetailedHTMLProps, FormEvent, SetStateAction, useEffect, useState } from "react";
import { supabase } from "../../client";
import Input from "../components/ui/Input";
import s from "../styles/Landing.module.css";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    // disable button if no email
    if (!email) return;

    const { error, user } = await supabase.auth.signIn({ email });

    if (error) {
      console.log(error);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  }

  return (
    <section className={s.container}>
      <h1>Magic-Link Sign In</h1>
      {loading ? (
        <section className={s.container}>Loading...</section>
      ) : submitted ? (
        <h3>Please check your email to sign in</h3>
      ) : (
        <form onSubmit={handleSignIn}>
          <Input type="email" placeholder="Email" value={email} onChange={setEmail} required></Input>
          <button type="submit">Sign In</button>
        </form>
      )}
    </section>
  );
}

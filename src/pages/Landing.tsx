import { ChangeEvent, DetailedHTMLProps, FormEvent, useEffect, useState } from "react";
import { supabase } from "../../client";
import Input from "../components/ui/Input";

import { useUser } from "@supabase/supabase-auth-helpers/react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useUser();
  console.log("user", user);
  useEffect(() => {
    console.log(email);
  }, [email]);

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    // disable button if no email
    if (!email) return;
    console.log(email);
    // const { error, user } = await supabase.auth.signIn({ email });

    // if (error) {
    //   console.log(error);
    // } else {
    //   console.log(user);
    // }
    setLoading(false);
  }
  return (
    <section>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <Input type="email" placeholder="Email" value={email} onChange={setEmail} required></Input>
        <button type="submit">Sign In</button>
      </form>
    </section>
  );
}

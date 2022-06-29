import { ChangeEvent, DetailedHTMLProps, FormEvent, SetStateAction, useEffect, useState } from "react";
import { supabase } from "../../client";
import Input from "../components/ui/Input";
import s from "../styles/Landing.module.css";

interface Props {
  raiseUser: (user: Object) => void;
}

export default function Landing({ raiseUser }: Props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // const user = supabase.auth.user();

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    console.log(e);
    e.preventDefault();

    setLoading(true);
    // disable button if no email
    if (!email) return;

    const { error, user } = await supabase.auth.signIn({ email });

    if (error) {
      console.log(error);
    } else {
      setSubmitted(true);
      console.log("wat", user);
      raiseUser({ username, user });
    }
    setLoading(false);
  }

  const validateInput = (e: ChangeEvent<HTMLFormElement>) => {
    const inputLength = e.target.value.length;
    if (e.target.type === "text") {
      setUsername(e.target.value);
      inputLength > 1 && inputLength < 30 ? setIsSubmitDisabled(false) : setIsSubmitDisabled(true);
    }
    if (e.target.type === "email") {
      setEmail(e.target.value);
      inputLength > 5 ? setIsSubmitDisabled(false) : setIsSubmitDisabled(true);
    }
  };

  if (loading) {
    return <section className={s.container}>Loading...</section>;
  }

  return (
    <section className={s.container}>
      <h1>Magic-Link Sign In</h1>
      {submitted ? (
        <h3>Please check your email to sign in</h3>
      ) : (
        <form onSubmit={handleSignIn} onChange={validateInput}>
          <Input type="text" placeholder="Name" value={username} required></Input>
          <Input type="email" placeholder="Email" value={email} required></Input>
          <button type="submit" disabled={isSubmitDisabled}>
            Sign In
          </button>
        </form>
      )}
    </section>
  );
}
